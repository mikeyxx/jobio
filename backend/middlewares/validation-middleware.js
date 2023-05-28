const { validationResult } = require("express-validator");

exports.validationMiddleware = (req, res, next) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).json({
      errors: errors.array(),
    });
  }
  next();
};
