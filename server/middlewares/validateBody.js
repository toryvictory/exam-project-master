function validateBody(validationSchema) {
  return async function validateBodyMiddleware(req, res, next) {
    try {
      const { body } = req;
      req.body.contests[0] = await validationSchema.validate(body.contests[0], {
        abortEarly: false,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = validateBody;
