const express = require('express');
const authentication = require('../middlewares/authentication');
const usersController = require('../controllers/user.controller');

const routes = express.Router();

routes.get('/sellers', authentication, usersController.getAllSeller);

module.exports = routes;
