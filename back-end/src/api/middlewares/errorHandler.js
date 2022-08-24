module.exports = (err, _req, res, _next) => {
  const statusByErrorStatus = {
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    alreadyExists: 409,
    UnprocessableEntity: 422,
  };

  const status = statusByErrorStatus[err.status] || 500;

  return res.status(status).json({ message: err.message });
};
