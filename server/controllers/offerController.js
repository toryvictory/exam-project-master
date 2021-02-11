const _ = require('lodash');
const createHttpError = require('http-errors');
const {
  sequelize,
  User,
  Contest,
  Offer,
} = require('../models');
const ServerError = require('../errors/ServerError');
const controller = require('../socketInit');
const CONSTANTS = require('../constants');

module.exports.setNewOffer = async (req, res, next) => {
  const {
    body: {
      contestType,
      offerData,
      contestId,
      customerId,
    },
    tokenPayload: {
      userId,
    },
  } = req;
  const obj = {};
  if (contestType === CONSTANTS.LOGO_CONTEST) {
    const {
      file: {
        filename,
        originalname,
      },
    } = req;
    obj.fileName = filename;
    obj.originalFileName = originalname;
  } else {
    obj.text = offerData;
  }
  obj.userId = userId;
  obj.contestId = contestId;
  try {
    const result = await Offer.create(obj);
    if (!result) {
      throw createHttpError(400, 'cannot create new Offer');
    }
    const newOffer = result.dataValues;
    delete newOffer.contestId;
    delete newOffer.userId;
    controller
      .getNotificationController()
      .emitEntryCreated(customerId);
    const user = await User.findByPk(userId);
    if (!user) {
      throw createHttpError(401, 'Unauthorized');
    }
    const userData = _.omit(user.dataValues, ['password']);
    res.send({ ...newOffer, User: userData });
  } catch (e) {
    next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const [count, [rejectedOffer]] = await Offer.update(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    {
      where: { id: offerId },
      returning: true,
    },
  );
  if (count !== 1) {
    throw createHttpError(404, 'Cannot update offer status');
  }
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Some of your offers was rejected',
      contestId,
    );
  return rejectedOffer;
};

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction,
) => {
  const contestsFromOneOrder = await Contest.findAll({
    where: {
      orderId,
    },
  });
  let prize;
  contestsFromOneOrder.map((contest) => {
    if (contest.id === contestId && contest.orderId === orderId) {
      contest.status = CONSTANTS.CONTEST_STATUS_FINISHED;
      prize = contest.prize;
    } else if (contest.orderId === orderId && contest.priority === priority + 1) {
      contest.status = CONSTANTS.CONTEST_STATUS_ACTIVE;
    } else {
      contest.status = CONSTANTS.CONTEST_STATUS_PENDING;
    }
    return contest;
  });
  await Promise.all(contestsFromOneOrder.map(async (contest) => {
    await contest.save({ transaction });
  }));

  const user = await User.findByPk(creatorId);
  await user.increment('balance', { by: prize, transaction });

  const offers = await Offer.findAll({ where: { contestId } });
  await Promise.all(offers.map(async (offer) => offer.update(
    {
      status: offer.id === offerId
        ? CONSTANTS.OFFER_STATUS_WON
        : CONSTANTS.OFFER_STATUS_REJECTED,
    },
    {
      transaction,
    },
  )));

  transaction.commit();
  const arrayRoomsId = [];
  offers.forEach((offer) => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS_REJECTED
      && creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      arrayRoomsId,
      'Some of your offers was rejected',
      contestId,
    );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Some of your offers WON', contestId);
  const winningOffer = offers.filter(
    (offer) => offer.status === CONSTANTS.OFFER_STATUS_WON,
  );
  return winningOffer[0].dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  const {
    body: {
      command,
      offerId,
      creatorId,
      contestId,
      orderId,
      priority,
    },
  } = req;
  if (command === 'reject') {
    try {
      const offer = await rejectOffer(
        offerId,
        creatorId,
        contestId,
      );
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (command === 'resolve') {
    try {
      transaction = await sequelize.transaction();
      const winningOffer = await resolveOffer(
        contestId,
        creatorId,
        orderId,
        offerId,
        priority,
        transaction,
      );
      res.send(winningOffer);
    } catch (err) {
      await transaction.rollback();
      next(err);
    }
  }
};
