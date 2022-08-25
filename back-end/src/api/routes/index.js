const express = require('express');
const loginRoutes = require('./login.routes');
const adminRoutes = require('./admin.routes');

const routes = express.Router();

routes.use('/login', loginRoutes);
routes.use('/admin', adminRoutes);

module.exports = routes;
