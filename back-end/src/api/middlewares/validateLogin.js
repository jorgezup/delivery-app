const joi = require('joi');

const schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const validateLogin = (req, _res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    next({
      status: 'badRequest',
      message: 'Some required fields are missing',
    });
  }

  next();
};

module.exports = validateLogin;
