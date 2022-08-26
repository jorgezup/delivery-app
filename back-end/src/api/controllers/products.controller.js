const productsService = require('../services/products.service');

const getAllProducts = async (req, res) => {
  const products = await productsService.getAllProducts();

  return res.status(200).json(products);
};

module.exports = { getAllProducts };