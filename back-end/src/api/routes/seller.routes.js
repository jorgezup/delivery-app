const express = require('express');
const authentication = require('../middlewares/authentication');
const sellersController = require('../controllers/sellers.controller');

const routes = express.Router();

routes.get('/orders', authentication, sellersController.getAllOrders);

module.exports = routes;
