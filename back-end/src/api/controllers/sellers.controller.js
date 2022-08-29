const sellersService = require('../services/sellers.service');

const getAllOrders = async (req, res) => {
  const { id } = res.locals.user;
  const orders = await sellersService.getAllOrders(id);

  return res.status(200).json(orders);
};

module.exports = { getAllOrders };
