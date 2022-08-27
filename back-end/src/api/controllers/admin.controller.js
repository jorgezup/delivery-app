const adminService = require('../services/admin.service');

const createUser = async (req, res) => {
  const user = await adminService.createUser(req.body);
  
  return res.status(201).json(user);
};

const getAllUsers = async (req, res) => {
  const users = await adminService.getAllUsers();
  
  return res.status(200).json(users);
};

const deleteUser = async (req, res) => {
  const deletedUser = await adminService.deleteUser(req.params.id);
  
  if (!deletedUser) return res.status(404).json({ message: 'User not found' });

  return res.status(204).end();
};

module.exports = { createUser, getAllUsers, deleteUser };
