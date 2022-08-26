const { Product } = require('../../database/models');

const getAllProducts = async () => {
  const products = await Product.findAll();
  console.log(products);
  return products;
};

module.exports = { getAllProducts };
