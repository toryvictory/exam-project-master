const { Op } = require('sequelize');
const { Contest, User } = require('../models/index');
const RightsError = require('../errors/RightsError');
const ServerError = require('../errors/ServerError');
const CONSTANTS = require('../constants');

module.exports.canGetContest = async (req, res, next) => {
  let result = null;
  try {
    const user = await User.findOne({
      where: { id: req.tokenPayload.userId },
    });
    req.tokenPayload.role = user.role;
    if (req.tokenPayload.role === CONSTANTS.CUSTOMER) {
      result = await Contest.findOne({
        where: { id: req.headers.contestid, userId: req.tokenPayload.userId },
      });
    } else if (req.tokenPayload.role === CONSTANTS.CREATOR) {
      result = await Contest.findOne({
        where: {
          id: req.headers.contestid,
          status: {
            [Op.or]: [
              CONSTANTS.CONTEST_STATUS_ACTIVE,
              CONSTANTS.CONTEST_STATUS_FINISHED,
            ],
          },
        },
      });
    }
    result ? next() : next(new RightsError());
  } catch (e) {
    next(new ServerError(e));
  }
};

module.exports.canSendOffer = async (req, res, next) => {
  if (req.tokenPayload.role === CONSTANTS.CUSTOMER) {
    return next(new RightsError());
  }
  try {
    const result = await Contest.findOne({
      where: {
        id: req.body.contestId,
      },
      attributes: ['status'],
    });
    if (
      result.get({ plain: true }).status === CONSTANTS.CONTEST_STATUS_ACTIVE
    ) {
      next();
    } else {
      return next(new RightsError());
    }
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.onlyForCustomerWhoCreateContest = async (req, res, next) => {
  try {
    const result = await Contest.findOne({
      where: {
        userId: req.tokenPayload.userId,
        id: req.body.contestId,
        status: CONSTANTS.CONTEST_STATUS_ACTIVE,
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.canUpdateContest = async (req, res, next) => {
  try {
    const result = Contest.findOne({
      where: {
        userId: req.tokenPayload.userId,
        id: req.body.contestId,
        status: { [Op.not]: CONSTANTS.CONTEST_STATUS_FINISHED },
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};
