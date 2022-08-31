const sellersService = require('../services/sellers.service');

const getAllOrders = async (req, res) => {
  const { id } = res.locals.user;
  const orders = await sellersService.getAllOrders(id);

  return res.status(200).json(orders);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await sellersService.getSaleById(id);

  return res.status(200).json(sale);
};

const changeStatus = async (req, res) => {
  const { id, status } = req.body;
  const { id: userId } = res.locals.user;
  const updatedSale = await sellersService.changeStatus(id, status, userId);

  return res.status(200).json(updatedSale);
};

module.exports = { getAllOrders, getSaleById, changeStatus };
