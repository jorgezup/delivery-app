const loginService = require('../services/login.service');

const login = async (req, res) => {
  const { token, status, message } = await loginService.authentication(
    req.body,
  );

  if (!token) {
    return res.status(status).json({ message });
  }

  return res.status(200).json({ token });
};

const validate = async (req, res) => {
  const { user } = res.locals;
  console.log(user);
  return res.status(200).json({ role: user.role });
};

module.exports = { login, validate };
