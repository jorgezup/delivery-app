const createErrorObj = require('../../utils/createErrorObj');

const isAdmin = (req, res, next) => {
  const { user } = res.locals;
  
  if (user.role !== 'administrator') {
    return next(createErrorObj('unauthorized', 'Unauthorized'));
  }

  return next();
};

module.exports = isAdmin;
