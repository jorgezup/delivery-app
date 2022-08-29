const express = require('express');
const loginRoutes = require('./login.routes');
const registerRoutes = require('./register.routes');
const adminRoutes = require('./admin.routes');
const productsRoutes = require('./products.routes');
const ordersRoutes = require('./orders.routes');

const routes = express.Router();

routes.use('/login', loginRoutes);
routes.use('/register', registerRoutes);
routes.use('/admin', adminRoutes);
routes.use('/products', productsRoutes);
routes.use('/orders', ordersRoutes);

module.exports = routes;
