const users = require('express').Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
const { validateUpdateAvatar, validateUpdateProfile, validateGetUsersById } = require('../middlewares/validator');

users.get('/', getAllUsers);
users.get('/me', getCurrentUser);
users.get('/:userId', validateGetUsersById, getUserById);
users.patch('/me', validateUpdateProfile, updateUser);
users.patch('/me/avatar', validateUpdateAvatar, updateUserAvatar);

module.exports = users;
