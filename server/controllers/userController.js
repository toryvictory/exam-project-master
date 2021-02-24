const _ = require('lodash');
const createHttpError = require('http-errors');
const {
  User,
} = require('../models');

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
