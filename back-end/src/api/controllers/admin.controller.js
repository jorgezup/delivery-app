const loginService = require('../services/login.service');

const createUser = async (req, res) => {
  const { token, role, name, email } = await loginService.authentication(
    req.body,
  );

  return res.status(200).json({ name, email, role, token });
};

const getAllUsers = async (req, res) => {
  const { user } = res.locals;
  return res.status(200).json({ role: user.role });
};

module.exports = { createUser, getAllUsers };
