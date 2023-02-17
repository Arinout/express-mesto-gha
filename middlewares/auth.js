const jwtoken = require('jsonwebtoken');
const UnautorizedError = require('../errors/unauthorized-error');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    throw new UnautorizedError('Необходимо зарегистрироваться');
  }

  let payload;
  try {
    payload = jwtoken.verify(jwt, 'some-secret-key');
  } catch (err) {
    throw new UnautorizedError('Необходима авторизация, токен истек');
  }

  req.user = payload;
  next();
};
