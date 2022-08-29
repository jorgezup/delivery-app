const { Sale } = require('../../database/models');

const getAllOrders = async (id) => Sale.findAll({
    where: { sellerId: id },
  });

module.exports = { getAllOrders };
