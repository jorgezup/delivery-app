const { StatusCodes } = require('http-status-codes');
const orderService = require('../services/order.service');

const getAllOrdersByClient = async (req, res) => {
  const infoUser = res.locals.user;
  const orders = await orderService.getAllOrdersByClient(infoUser.email);

  return res.status(200).json(orders);
};

const createOrder = async (req, res) => {
  const result = await orderService.createOrder(req.body);

  res.status(StatusCodes.CREATED).end();
};

module.exports = {
  getAllOrdersByClient,
  createOrder,
};