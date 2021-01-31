const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { Op } = require('sequelize');
const uuid = require('uuid/v1');
const _ = require('lodash');
const CONSTANTS = require('../constants');
const {
  sequelize,
  Contest,
  Sequelize,
  CreditCard,
  Offer,
  Rating,
  User,
} = require('../models');

const NotFound = require('../errors/UserNotFoundError');
const ServerError = require('../errors/ServerError');
const UtilFunctions = require('../utils/functions');
const NotEnoughMoney = require('../errors/NotEnoughMoney');
const NotUniqueEmail = require('../errors/NotUniqueEmail');
const controller = require('../socketInit');
const userQueries = require('./queries/userQueries');
const bankQueries = require('./queries/bankQueries');
const ratingQueries = require('./queries/ratingQueries');
const BadRequestError = require('../errors/BadRequestError');

// module.exports.login = async (req, res, next) => {
//   try {
//     const foundUser = await userQueries.findUser({ email: req.body.email });
//     await userQueries.passwordCompare(req.body.password, foundUser.password);
//     const accessToken = jwt.sign(
//       {
//         firstName: foundUser.firstName,
//         userId: foundUser.id,
//         role: foundUser.role,
//         lastName: foundUser.lastName,
//         avatar: foundUser.avatar,
//         displayName: foundUser.displayName,
//         balance: foundUser.balance,
//         email: foundUser.email,
//         rating: foundUser.rating,
//       },
//       CONSTANTS.JWT_SECRET,
//       { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME }
//     );
//     await userQueries.updateUser({ accessToken: accessToken }, foundUser.id);
//     res.send({ token: accessToken });
//   } catch (err) {
//     next(err);
//   }
// };
// module.exports.registration = async (req, res, next) => {
//   try {
//     const newUser = await userQueries.userCreation(
//       Object.assign(req.body, { password: req.hashPass })
//     );
//     const accessToken = jwt.sign(
//       {
//         firstName: newUser.firstName,
//         userId: newUser.id,
//         role: newUser.role,
//         lastName: newUser.lastName,
//         avatar: newUser.avatar,
//         displayName: newUser.displayName,
//         balance: newUser.balance,
//         email: newUser.email,
//         rating: newUser.rating,
//       },
//       CONSTANTS.JWT_SECRET,
//       { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME }
//     );
//     await userQueries.updateUser({ accessToken: accessToken }, newUser.id);
//     res.send({ token: accessToken });
//   } catch (err) {
//     if (err.name === 'SequelizeUniqueConstraintError') {
//       next(new NotUniqueEmail());
//     } else {
//       next(err);
//     }
//   }
// };

module.exports.updateUser = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.avatar = req.file.filename;
    }
    const {
      body: data,
      tokenPayload: { userId },
    } = req;

    const [updatedCount, [updatedUser]] = await User.update(data, {
      where: { id: userId },
      returning: true,
    });
    if (updatedCount !== 1) {
      throw new ServerError('cannot update user');
    }
    const userData = updatedUser.get();
    const user = _.omit(userData, ['password']);
    res.status(200).send(
      {
        user,
      },
    );
  } catch (err) {
    next(err);
  }
};

function getQuery(offerId, userId, mark, isFirst, transaction) {
  const getCreateQuery = () => ratingQueries.createRating(
    {
      offerId,
      mark,
      userId,
    },
    transaction,
  );
  const getUpdateQuery = () => ratingQueries.updateRating(
    { mark },
    { offerId, userId },
    transaction,
  );
  return isFirst ? getCreateQuery : getUpdateQuery;
}

module.exports.changeMark = async (req, res, next) => {
  let sum = 0;
  let avg = 0;
  let transaction;
  const {
    isFirst, offerId, mark, creatorId,
  } = req.body;
  const { userId } = req.tokenPayload;
  try {
    transaction = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    });
    const query = getQuery(offerId, userId, mark, isFirst, transaction);
    await query();
    const offersArray = await Rating.findAll({
      include: [
        {
          model: Offer,
          required: true,
          where: { userId: creatorId },
        },
      ],
      transaction,
    });
    for (let i = 0; i < offersArray.length; i++) {
      sum += offersArray[i].dataValues.mark;
    }
    avg = sum / offersArray.length;

    await userQueries.updateUser({ rating: avg }, creatorId, transaction);
    transaction.commit();
    controller.getNotificationController().emitChangeMark(creatorId);
    res.send({ userId: creatorId, rating: avg });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

module.exports.payment = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      body: {
        cvc, expiry, price, number,
      },
    } = req;
    const squadhelpCreditCardNumber = process.env.SQUADHELP_CREDIT_CARD_NUMBER || CONSTANTS.SQUADHELP_BANK_NUMBER;

    const clientCreditCard = await CreditCard.findOne({
      where: {
        cardNumber: number.replace(/ /g, ''),
        expiry,
        cvc,
      },
      transaction,
    });

    const squadhelpCreditCard = await CreditCard.findOne({
      where: {
        cardNumber: squadhelpCreditCardNumber,
      },
      transaction,
    });

    if (!clientCreditCard) {
      throw new Error('Transaction declined by the bank');
    }
    await clientCreditCard.update(
      {
        balance: Sequelize.literal(`"CreditCards"."balance" - ${price}`),
      },
      { transaction },
    );

    await squadhelpCreditCard.update(
      {
        balance: Sequelize.literal(`"CreditCards"."balance" + ${price}`),
      },
      { transaction },
    );

    const orderId = uuid();
    req.body.contests.forEach((contest, index) => {
      const prize = index === req.body.contests.length - 1
        ? Math.ceil(req.body.price / req.body.contests.length)
        : Math.floor(req.body.price / req.body.contests.length);
      contest = Object.assign(contest, {
        status: index === 0 ? 'active' : 'pending',
        userId: req.tokenPayload.userId,
        priority: index + 1,
        orderId,
        createdAt: moment().format('YYYY-MM-DD HH:mm'),
        prize,
      });
    });
    await Contest.bulkCreate(req.body.contests, transaction);
    await transaction.commit();
    res.send();
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

module.exports.cashout = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const updatedUser = await userQueries.updateUser(
      { balance: sequelize.literal(`balance - ${req.body.sum}`) },
      req.tokenPayload.userId,
      transaction,
    );
    await bankQueries.updateBankBalance(
      {
        balance: sequelize.literal(`CASE 
                WHEN "cardNumber"='${req.body.number.replace(
    / /g,
    '',
  )}' AND "expiry"='${req.body.expiry}' AND "cvc"='${
  req.body.cvc
}'
                    THEN "balance"+${req.body.sum}
                WHEN "cardNumber"='${
  CONSTANTS.SQUADHELP_BANK_NUMBER
}' AND "expiry"='${
  CONSTANTS.SQUADHELP_BANK_EXPIRY
}' AND "cvc"='${CONSTANTS.SQUADHELP_BANK_CVC}'
                    THEN "balance"-${req.body.sum}
                 END
                `),
      },
      {
        cardNumber: {
          [Op.in]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            req.body.number.replace(/ /g, ''),
          ],
        },
      },
      transaction,
    );
    transaction.commit();
    res.send({ balance: updatedUser.balance });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};
