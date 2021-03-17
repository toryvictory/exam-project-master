const _ = require('lodash');
const createHttpError = require('http-errors');
const {
  sequelize,
  Sequelize,
  User,
  Contest,
  Offer,
  Rating,
} = require('../models');
const ServerError = require('../errors/ServerError');
const controller = require('../socketInit');
const CONSTANTS = require('../constants');
const EmailService = require('../services/emailService/offerProcessedByModeratorEmail');

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

module.exports.getOffers = async (req, res, next) => {
  const {
    query: {
      status, page, limit,
    },
  } = req;
  const offset = (page - 1) * limit;
  try {
    const { count, rows: offers } = await Offer.findAndCountAll(
      {
        where: { moderationStatus: status },
        limit,
        offset,
        order: [['createdAt', `${status === CONSTANTS.MODERATION_STATUS_PENDING ? 'ASC' : 'DESC'}`]],
        raw: true,
      },
    );
    res.status(200).send({ offers, count });
  } catch (err) {
    next(err);
  }
};

module.exports.changeOfferModerationStatus = async (req, res, next) => {
  const {
    body: {
      id,
      moderationStatus,
    },
  } = req;
  try {
    const [updatedCount, [offer]] = await Offer.update(
      { moderationStatus },
      {
        where: { id },
        returning: true,
      },
    );

    if (updatedCount !== 1) {
      throw createHttpError(400, 'cannot update offer moderation status');
    }
    req.offer = offer;
    res.status(200).send(offer.dataValues);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports.sendOfferModerationEmail = async (req, res, next) => {
  const {
    offer,
  } = req;
  let isApproved;
  if (offer.moderationStatus === CONSTANTS.MODERATION_STATUS_APPROVED) {
    isApproved = true;
  } else if (offer.moderationStatus === CONSTANTS.MODERATION_STATUS_REJECTED) {
    isApproved = false;
  }
  try {
    const contest = await Contest.findByPk(offer.contestId);
    const user = await User.findByPk(offer.userId);
    const fullName = `${user.firstName} ${user.lastName}`;
    await EmailService.sendOfferModerationEmail(user.email, isApproved, fullName, contest.title);
  } catch (err) {
    console.log(err);
  }
};
