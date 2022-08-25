const express = require('express');
const adminController = require('../controllers/admin.controller');
const authentication = require('../middlewares/authentication');
const validateUser = require('../middlewares/validateUser');
const isAdmin = require('../middlewares/isAdmin');

const routes = express.Router();

routes.post('/manage', authentication, isAdmin, validateUser, adminController.createUser);
routes.get('/manage', authentication, isAdmin, adminController.getAllUsers);
routes.delete('/manage/:id', authentication, isAdmin, adminController.deleteUser);

module.exports = routes;
