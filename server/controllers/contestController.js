const _ = require('lodash');
const {
  Sequelize,
  User,
  Offer,
  Select,
  Rating,
  Contest,
} = require('../models');
const ServerError = require('../errors/ServerError');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');

module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  const {
    body: {
      characteristic1,
      characteristic2,
    },
  } = req;
  try {
    const whereOption = {
      type: {
        [Sequelize.Op.or]: _.compact([
          characteristic1,
          characteristic2,
          'industry',
        ]),
      },
    };
    const characteristics = await Select.findAll({
      where: whereOption,
    });
    if (!characteristics) {
      next(new ServerError());
      return;
    }
    characteristics.forEach((characteristic) => {
      if (!response[characteristic.type]) {
        response[characteristic.type] = [];
      }
      response[characteristic.type].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    next(new ServerError('cannot get contest preferences'));
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    const {
      headers: {
        contestid,
      },
      tokenPayload: {
        role,
        userId,
      },
    } = req;

    let offerConstraint;
    if (role === CONSTANTS.CREATOR) {
      offerConstraint = { userId };
    } else if (role === CONSTANTS.CUSTOMER) {
      offerConstraint = { moderationStatus: CONSTANTS.MODERATION_STATUS_APPROVED };
    }

    let contestInfo = await Contest.findOne({
      where: { id: contestid },
      order: [[Offer, 'id', 'asc']],
      include: [
        {
          model: User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: Offer,
          required: false,
          where: offerConstraint,
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: User,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance', 'accessToken'],
              },
            },
            {
              model: Rating,
              required: false,
              where: { userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });
    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach((offer) => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const {
    params: {
      fileName,
    },
  } = req;
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + fileName;
  res.download(file);
};

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    const {
      file: {
        filename,
        originalname,
      },
    } = req;
    req.body.fileName = filename;
    req.body.originalFileName = originalname;
  }
  const { contestId } = req.body;
  delete req.body.contestId;
  try {
    const [updatedCount, [updatedContest]] = await Contest.update(req.body, {
      where: {
        id: contestId,
        userId: req.tokenPayload.userId,
      },
      returning: true,
    });
    if (updatedCount !== 1) {
      throw new ServerError('cannot update Contest');
    }
    res.send(updatedContest.dataValues);
  } catch (e) {
    next(e);
  }
};

module.exports.getCustomersContests = (req, res, next) => {
  const {
    headers: {
      status,
    },
    tokenPayload: {
      userId,
    },
    body: {
      limit,
    },
  } = req;
  Contest.findAll({
    where: { status, userId },
    limit,
    offset: req.body.offset ? req.body.offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: Offer,
        required: false,
        attributes: ['id'],
        where: {
          moderationStatus: CONSTANTS.MODERATION_STATUS_APPROVED,
        },
      },
    ],
  })
    .then((contests) => {
      contests.forEach(
        (contest) => { contest.dataValues.count = contest.dataValues.Offers.length; },
      );
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch((err) => next(new ServerError(err)));
};

module.exports.getContests = (req, res, next) => {
  const predicates = UtilFunctions.createWhereForAllContests(
    req.body.typeIndex,
    req.body.contestId,
    req.body.industry,
    req.body.awardSort,
  );
  Contest.findAll({
    where: predicates.where,
    order: predicates.order,
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    include: [
      {
        model: Offer,
        required: req.body.ownEntries,
        where: req.body.ownEntries ? { userId: req.tokenPayload.userId } : {},
        attributes: ['id'],
      },
    ],
  })
    .then((contests) => {
      contests.forEach(
        (contest) => (contest.dataValues.count = contest.dataValues.Offers.length),
      );
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch((err) => {
      next(new ServerError(err));
    });
};
