const { Sale } = require('../../database/models');

const getAllOrders = async (id) => Sale.findAll({
    where: { sellerId: id },
  });

const getSaleById = async (id) => Sale.findByPk(id, { include: ['products', 'sales'] });

const changeStatus = async (id, status, userId) => Sale.update({ status }, { 
  where: { id, sellerId: userId } });

module.exports = { getAllOrders, getSaleById, changeStatus };
