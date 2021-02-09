const _ = require('lodash');
const {
  sequelize,
  Sequelize,
  Offer,
  Rating,
  User,
} = require('../models');
const ServerError = require('../errors/ServerError');
const controller = require('../socketInit');
const userQueries = require('./queries/userQueries');
const ratingQueries = require('./queries/ratingQueries');

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
