const express = require('express');
const validateRegister = require('../middlewares/register.validate.middleware');
const userController = require('../controllers/user.controller');

const routes = express.Router();

routes.post('/',
  validateRegister, 
  userController.create);

module.exports = routes;
