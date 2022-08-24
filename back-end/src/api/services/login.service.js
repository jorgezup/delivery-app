const md5 = require('md5');
const { User } = require('../../database/models');
const { generateJWTToken } = require('../../utils/jwt');

const authentication = async ({ email, password }) => {
  const user = await User.findOne({
    attributes: ['id', 'name', 'email', 'password', 'role'],
    where: { email },
  });

  if (!user) {
    return { status: 404, message: 'Invalid fields or user not found!' };
  }

  if (md5(password) !== user.dataValues.password) {
    return { status: 404, message: 'User not found!' };
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const token = generateJWTToken(JSON.stringify(payload));
  
  return { token };
};

module.exports = { authentication };
