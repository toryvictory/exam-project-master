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
const contestQueries = require('./queries/contestQueries');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');

module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const whereOption = {
      type: {
        [Sequelize.Op.or]: _.compact([
          req.body.characteristic1,
          req.body.characteristic2,
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
    let contestInfo = await Contest.findOne({
      where: { id: req.headers.contestid },
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
          where:
            req.tokenPayload.role === CONSTANTS.CREATOR
              ? { userId: req.tokenPayload.userId }
              : {},
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
              where: { userId: req.tokenPayload.userId },
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
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  const { contestId } = req.body;
  delete req.body.contestId;
  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      userId: req.tokenPayload.userId,
    });
    res.send(updatedContest);
  } catch (e) {
    next(e);
  }
};

module.exports.getCustomersContests = (req, res, next) => {
  Contest.findAll({
    where: { status: req.headers.status, userId: req.tokenPayload.userId },
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: Offer,
        required: false,
        attributes: ['id'],
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
      next(new ServerError());
    });
};
