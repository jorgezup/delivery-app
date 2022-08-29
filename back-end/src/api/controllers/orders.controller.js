const orderService = require('../services/order.service');

const getAllOrdersByClient = async (req, res) => {
  const infoUser = res.locals.user;
  const orders = await orderService.getAllOrdersByClient(infoUser.email);

  return res.status(200).json(orders);
};

module.exports = {
  getAllOrdersByClient,
};