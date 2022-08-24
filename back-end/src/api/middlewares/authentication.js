const { decodeToken } = require("../../utils/jwt");

const authentication = (req, res, next) => {
  if (!req.headers.authorization)
    throw createErrorObj(400, '"token" is required!');
  try {
    const token = req.headers.authorization;
    const payload = decodeToken(token);
    res.locals.user = payload;
    next();
  } catch (error) {
    throw createErrorObj(401, error.message);
  }
};

module.exports = authentication;
