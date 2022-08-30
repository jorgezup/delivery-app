const Joi = require("joi");

const orderDto = Joi.object({
  sale: Joi.object({
    userId: Joi.number().min(1).required(),
    sellerId: Joi.number().min(1).required(),
    totalPrice: Joi.number().required(),
    deliveryAddress: Joi.string().required(),
    deliveryNumber: Joi.string().required(),
    status: Joi.string().required(),
  }),
  products: Joi.array().items(Joi.object({
    product_id: Joi.number().min(1).required(),
    quantity: Joi.number().min(1).required(),
  })).required(),
});

const validateOrder = (req, _res, next) => {
  const {error} = orderDto.validate(req.body);
  if (error) {
    next({
      status: 'badRequest',
      message: error.message,
    })
  }
}

module.exports = validateOrder;