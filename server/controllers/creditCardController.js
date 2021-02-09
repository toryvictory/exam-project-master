const _ = require('lodash');
const moment = require('moment');
const uuid = require('uuid/v1');
const createHttpError = require('http-errors');
const CONSTANTS = require('../constants');
const {
  sequelize,
  Contest,
  CreditCard,
  User,
} = require('../models');

const squadhelpCreditCardNumber = process.env.SQUADHELP_CREDIT_CARD_NUMBER
  || CONSTANTS.SQUADHELP_BANK_NUMBER;

const transferMoney = async (payerCardDetails, receiverCardDetails, sum, transaction) => {
  const payerCreditCard = await CreditCard.findOne({
    where: payerCardDetails,
  });

  const receiverCreditCard = await CreditCard.findOne({
    where: receiverCardDetails,
  });

  if (!payerCreditCard || !receiverCreditCard) {
    throw createHttpError(404, 'Transaction declined by the bank');
  }

  if (payerCreditCard.balance - sum < 0) {
    throw createHttpError(403, 'Not enough money to perform the transaction');
  }
  sum = parseFloat(sum);
  payerCreditCard.balance -= sum;
  await payerCreditCard.save({ transaction });
  receiverCreditCard.balance += sum;
  await receiverCreditCard.save({ transaction });
};

module.exports.payment = async (req, res, next) => {
  let transaction;
  const {
    body: {
      cvc, expiry, price, number, contests,
    },
    tokenPayload: { userId },
  } = req;

  try {
    transaction = await sequelize.transaction();
    await transferMoney({
      cardNumber: number.replace(/ /g, ''),
      expiry,
      cvc,
    },
    {
      cardNumber: squadhelpCreditCardNumber,
    },
    price,
    transaction);

    const orderId = uuid();
    contests.forEach((contest, index) => {
      const prize = index === contests.length - 1
        ? Math.ceil(price / contests.length)
        : Math.floor(price / contests.length);
      contest = Object.assign(contest, {
        status: index === 0 ? 'active' : 'pending',
        userId,
        priority: index + 1,
        orderId,
        createdAt: moment().format('YYYY-MM-DD HH:mm'),
        prize,
      });
    });
    await Contest.bulkCreate(contests, transaction);
    await transaction.commit();
    res.send();
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

module.exports.cashout = async (req, res, next) => {
  let transaction;
  const {
    body: {
      cvc, expiry, number, sum,
    },
    tokenPayload: { userId },
  } = req;

  try {
    transaction = await sequelize.transaction();
    const user = await User.findByPk(userId);
    if (!user) {
      throw createHttpError(401, 'not authorized');
    }
    if (user.balance - sum < 0) {
      throw new Error('Noy enough money on your balance to perform the transaction');
    }
    user.balance -= sum;
    await user.save({ transaction });

    await transferMoney({
      cardNumber: squadhelpCreditCardNumber,
    },
    {
      cardNumber: number.replace(/ /g, ''),
      expiry,
      cvc,
    },
    sum,
    transaction);

    transaction.commit();
    const userData = _.omit(user.dataValues, ['password']);
    res.status(200).send(userData);
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};
