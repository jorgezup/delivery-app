const joi = require('joi');

const schema = joi.object({
  name: joi.string().min(12).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  role: joi.string().min(6).required(),
});

const validateUser = (req, _res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    next({
      status: 'badRequest',
      message: error.message,
    });
  }

  next();
};

module.exports = validateUser;
