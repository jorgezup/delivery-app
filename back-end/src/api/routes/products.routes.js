const express = require('express');
// const authentication = require('../middlewares/authentication');
const productsController = require('../controllers/products.controller');

const routes = express.Router();

routes.get('/', productsController.getAllProducts);

module.exports = routes;