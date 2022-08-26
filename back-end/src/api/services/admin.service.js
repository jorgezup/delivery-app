const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../../database/models');
const createErrorObj = require('../../utils/createErrorObj');

const checkIfNameAlreadyExists = async (name) => User.findOne({
  where: { name },
});
const checkIfEmailAlreadyExists = async (email) => User.findOne({
  where: { email },
});

const createUser = async ({ name, email, password, role }) => {
  const user = await checkIfEmailAlreadyExists(email) 
    || await checkIfNameAlreadyExists(name);

  if (user) {
    throw createErrorObj('alreadyExists', 'User already exists!');
  }

  const createdUser = {
    name,
    email,
    password: md5(password),
    role,
  };
  await User.create(createdUser);
  
  delete (createdUser.password);
  
  return createdUser;
};

const getAllUsers = async () => User.findAll({ 
  attributes: ['id', 'name', 'email', 'role'], 
  where: { role: { [Op.not]: 'administrator' } },
});

const deleteUser = async (id) => User.destroy({ where: { id } });

module.exports = { createUser, getAllUsers, deleteUser };
