const createHttpError = require('http-errors');
const { User } = require('../models');
const PasswordService = require('../services/passwordService');
const EmailService = require('../services/emailService/passwordResetConfirmationLinkEmail');

exports.resetPassword = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    const userInstance = await User.findOne({
      where: { email },
    });

    if (userInstance) {
      await userInstance.update({ newPasswordHash: password });
    } else {
      next(createHttpError(422, 'Bad request'));
      return;
    }

    const passResetToken = await PasswordService.createPassResetToken(userInstance);
    await EmailService.sendPassResetEmail(email, passResetToken);
    await res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.confirmPasswordReset = async (req, res, next) => {
  try {
    const {
      body: { token },
    } = req;

    const tokenPayload = await PasswordService.parsePassResetToken(token);
    if (tokenPayload instanceof Error) {
      next(tokenPayload);
      return;
    }

    const {
      userId,
      password,
    } = tokenPayload;

    const userInstance = await User.findByPk(userId);
    if (userInstance && userInstance.newPasswordHash === password) {
      userInstance.setDataValue('password', password);
      await userInstance.save({ fields: ['password'] });
      res.sendStatus(201);
    } else {
      next(createHttpError(403, 'Can\'t verify your password change request'));
    }
  } catch (err) {
    next(err);
  }
};
