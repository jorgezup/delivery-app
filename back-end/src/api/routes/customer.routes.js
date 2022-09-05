const express = require('express');
const sellerControler = require('../controllers/sellers.controller');
const authentication = require('../middlewares/authentication');

const routes = express.Router();

routes.get(
  '/orders/:id',
  authentication, 
  sellerControler.getSaleById,
);

module.exports = routes;
