const { StatusCodes } = require('http-status-codes');
const UserService = require('../services/user.register.service');

module.exports = {
  create: async (req, res, next) => {
    const user = await UserService.create(req.body);

    if (!user) {
      return next({
        status: 'alreadyExists',
        message: 'User already registered',
      });
    }

    return res.status(StatusCodes.CREATED).json(user);
  },
  
  getAllSeller: async (req, res) => {   
    const users = await UserService.getAllSeller();

    return res.status(StatusCodes.OK).json(users);
  },
};  
