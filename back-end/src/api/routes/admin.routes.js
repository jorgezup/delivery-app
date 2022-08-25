const express = require('express');
const adminController = require('../controllers/admin.controller');
const authentication = require('../middlewares/authentication');
const isAdmin = require('../middlewares/isAdmin');

const routes = express.Router();

routes.use(isAdmin);

routes.post('/manage', authentication, adminController.createUser);
routes.get('/manage', authentication, adminController.getAllUsers);

module.exports = routes;
