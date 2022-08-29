const express = require('express');
const authentication = require('../middlewares/authentication');
const orderController = require('../controllers/orders.controller');

const routes = express.Router();

routes.get('/clients/:id', authentication, orderController.getAllOrdersByClient);

module.exports = routes;