const { decodeToken } = require('../../utils/jwt');
const createErrorObj = require('../../utils/createErrorObj');

const authentication = (req, res, next) => {
  if (!req.headers.authorization) throw createErrorObj('unauthorized', '"token" is required!');
  try {
    const token = req.headers.authorization;
    res.locals.user = decodeToken(token);
    next();
  } catch (error) {
    throw createErrorObj('unauthorized', error.message);
  }
};

module.exports = authentication;
