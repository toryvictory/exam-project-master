const createHttpError = require('http-errors');

/**
 *
 * @param {Array} roles
 * @returns {function(*, *, *): <void>}
 */
module.exports = (roles) => (req, res, next) => {
  try {
    const {
      tokenPayload: {
        userRole,
      },
    } = req;
    if (roles.includes(userRole)) {
      next();
    } else {
      throw createHttpError(403, 'Not enough rights');
    }
  } catch (err) {
    next(err);
  }
};
