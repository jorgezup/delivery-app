const loginService = require('../services/login.service');

const login = async (req, res) => {
  const { token, role, name, email, id } = await loginService.authentication(
    req.body,
  );

  return res.status(200).json({ id, name, email, role, token });
};

const validate = async (req, res) => {
  const { user } = res.locals;

  return res.status(200).json({ role: user.role });
};

module.exports = { login, validate };
