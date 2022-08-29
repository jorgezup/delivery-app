const { Sale, User } = require('../../database/models');

const getAllOrdersByClient = async (email) => {
  const { id } = await User.findOne({ where: { email } });
  console.log(id);
  const orders = await Sale.findAll({ where: { userId: id } });

  return orders;
};

module.exports = {
  getAllOrdersByClient,
};