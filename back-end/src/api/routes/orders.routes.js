const express = require('express');
const authentication = require('../middlewares/authentication');
const orderController = require('../controllers/orders.controller');
const validateOrder = require('../middlewares/validateOrder');

const routes = express.Router();

routes.post('/', [
  authentication,
  validateOrder,
  orderController.createOrder,
]);

routes.get('/clients/:id', 
authentication,
orderController.getAllOrdersByClient);

module.exports = routes;
