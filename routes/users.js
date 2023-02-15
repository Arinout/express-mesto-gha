const users = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

users.get('/', getAllUsers);
users.post('/', createUser);
users.get('/:id', getUserById);
users.patch('/me', updateUser);
users.patch('/me/avatar', updateUserAvatar);

module.exports = users;

// id
// 638dcabcf5ebe088192a1bc0
