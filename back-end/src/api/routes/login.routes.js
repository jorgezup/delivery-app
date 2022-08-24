const express = require('express');
const loginController = require('../controllers/login.controller');
const authentication = require('../middlewares/authentication');
const validateLogin = require('../middlewares/validateLogin');

const routes = express.Router();

routes.post('/', validateLogin, loginController.login);
/* Rota validate apenas para validar os dados passados  */
routes.get('/validate', authentication, loginController.validate);

module.exports = routes;
