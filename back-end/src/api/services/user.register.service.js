const md5 = require('md5');
const { User } = require('../../database/models');

async function create({ name, email, password }) {
  const user = await User.findOne({ where: { name, email } });
  
  if (user) return null;

  const hashPassword = md5(password);
  const role = 'customer';

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    role });

  delete newUser.dataValues.password;
  
  return newUser;
}

const getAllSeller = async () => User.findAll({ where: { role: 'seller' } });

module.exports = { create, getAllSeller };
