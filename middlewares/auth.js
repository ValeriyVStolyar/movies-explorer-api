const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-err');

const { NODE_ENV, JWT_SECRET = 'dev-key' } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  // проверяем наличие токена как такового
  if (!token) {
  // токена нет - отправляем ошибку
    return next(new AuthorizationError('Необходимо авторизоваться!'));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthorizationError('Необходимо авторизоваться!'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
