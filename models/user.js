const mongoose = require('mongoose');
const validator = require('validator');
const { compare } = require('bcryptjs');
const NOT_FOUND_ERROR = require('../errors/not-found-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(avatarLink) {
        return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-])+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/i.test(avatarLink);
      },
      message: 'Неправильный формат ссылки',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Неверный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NOT_FOUND_ERROR('Неправильные почта или пароль');
      }
      return compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NOT_FOUND_ERROR('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
