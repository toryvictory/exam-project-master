const _ = require('lodash');
const createHttpError = require('http-errors');
const {
  sequelize,
  Sequelize,
  Offer,
  Rating,
  User,
} = require('../models');
const controller = require('../socketInit');

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
      throw createHttpError(400, 'cannot update user');
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

module.exports.changeMark = async (req, res, next) => {
  let sum = 0;
  let avg = 0;
  let transaction;
  const {
    tokenPayload: {
      userId,
    },
    body: {
      isFirst, offerId, mark, creatorId,
    },
  } = req;
  try {
    transaction = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    });

    if (isFirst) {
      await Rating.create(
        {
          offerId,
          mark,
          userId,
        },
        { transaction },
      );
    } else {
      const [updatedCount] = await Rating.update(
        { mark },
        {
          where: { offerId, userId },
          transaction,
        },
      );
      if (updatedCount !== 1) {
        throw createHttpError(400, 'cannot update this offer\'s rating');
      }
    }
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

    const [updatedCount] = await User.update(
      { rating: avg },
      {
        where: {
          id: creatorId,
        },
        transaction,
      },
    );

    if (updatedCount !== 1) {
      throw createHttpError(400, 'cannot update user rating');
    }
    transaction.commit();
    controller.getNotificationController().emitChangeMark(creatorId);
    res.send({ userId: creatorId, rating: avg });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};
