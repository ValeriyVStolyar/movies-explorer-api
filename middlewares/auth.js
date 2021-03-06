const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-err');
const {
  AUTH_ERROR_MESSAGE,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET = 'dev-key' } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  // проверяем наличие токена как такового
  if (!token) {
  // токена нет - отправляем ошибку
    return next(new AuthorizationError(AUTH_ERROR_MESSAGE));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AuthorizationError('Необходимо авторизоваться!'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
