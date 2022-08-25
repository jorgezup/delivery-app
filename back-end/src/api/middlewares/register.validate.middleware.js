const Joi = require('joi');

const registerDTO = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = (req, _res, next) => {
  const { error } = registerDTO.validate(req.body);

  if (!error) return next();

  next(error);
};
