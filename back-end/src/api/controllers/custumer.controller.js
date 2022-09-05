const customerService = require('../services/customer.service');

const changeStatus = async (req, res) => {
  const { id, status } = req.body;
  const { id: userId } = res.locals.user;
  const updatedSale = await customerService.changeStatus(id, status, userId);

  return res.status(200).json(updatedSale);
};

module.exports = { changeStatus };
