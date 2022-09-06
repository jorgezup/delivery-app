const { Sale } = require('../../database/models');

const changeStatus = async (id, status, userId) => Sale.update({ status }, { 
  where: { id, userId } });

module.exports = { changeStatus };