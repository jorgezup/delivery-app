const { User } = require('../../database/models');

const getAllUsers = async () => User.findAll({ 
  attributes: ['id', 'name', 'email', 'password', 'role'], 
});

module.exports = { getAllUsers };
