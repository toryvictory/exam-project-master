const { contestSchema } = require('../validation/schemas');

function validateBody(validationSchema) {
  return async function validateBodyMiddleware(req, res, next) {
    try {
      const { body } = req;
      if (validationSchema === contestSchema) {
        req.body.contests[0] = await validationSchema.validate(body.contests[0], {
          abortEarly: false,
        });
      } else {
        req.body = await validationSchema.validate(body, {
          abortEarly: false,
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = validateBody;
