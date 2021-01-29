const createHttpError = require('http-errors');
const config = require('../configs/config');
const JwtService = require('./jwtService');

exports.createPassResetToken = async (userInstance) => {
  const {
    jwt: { passResetTokenExpiresIn, passResetTokenSecret },
  } = config;

  return JwtService.sign(
    {
      userId: userInstance.get('id'),
      password: userInstance.get('newPasswordHash'),
    },
    passResetTokenSecret,
    {
      expiresIn: passResetTokenExpiresIn,
    },
  );
};

exports.parsePassResetToken = async (token) => {
  const {
    jwt: { passResetTokenSecret },
  } = config;

  return JwtService.verify(token, passResetTokenSecret)
    .catch(() => createHttpError(403, 'Can\'t verify your password reset request. The link is broken.'));
};
