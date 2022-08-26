const { Product } = require('../../database/models');

const getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  return products;
};

module.exports = getAllProducts;
