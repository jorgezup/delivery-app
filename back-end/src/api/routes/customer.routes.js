const express = require('express');
const sellerControler = require('../controllers/sellers.controller');
const customerController = require('../controllers/custumer.controller');
const authentication = require('../middlewares/authentication');

const routes = express.Router();

routes.get(
  '/orders/:id',
  authentication, 
  sellerControler.getSaleById,
);
routes.patch('/orders/status', authentication, customerController.changeStatus);

module.exports = routes;
