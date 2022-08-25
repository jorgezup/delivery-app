const UserService = require('../services/user.register.service');
const {StatusCodes} = require('http-status-codes')

module.exports = {
  create: async (req, res, next) => {
    const user = await UserService.create(req.body);

    if(!user) {
      return next({
        status: 'alreadyExists',
        message: 'User already registered'
      })
    }

    return res.status(StatusCodes.CREATED).json(user);
  }
}
