const CREATE_OK = 201;

const VALIDATION_ERROR = 'ValidationError';
const CAST_ERROR = 'CastError';

const BAD_REQUEST_ERROR_MESSAGE = 'Переданы невалидные данные.';
const AUTH_ERROR_MESSAGE = 'Необходима авторизация.';
const PERMISSION_ERROR_MESSAGE = 'Нельзя удалить чужую карточку.';
const NOT_FOUND_USER_ERROR_MESSAGE = 'Пользователь с указанным _id не найден.';
const NOT_FOUND_MOVIE_ERROR_MESSAGE = 'Фильм с указанным _id не найден.';
const ROUTE_ERROR_MESSAGE = 'Был запрошен несуществующий роут.';
const CONFLICT_ERROR_MESSAGE = 'Переданный email уже используется другим пользователем.';

module.exports = {
  CREATE_OK,
  VALIDATION_ERROR,
  CAST_ERROR,
  AUTH_ERROR_MESSAGE,
  BAD_REQUEST_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  ROUTE_ERROR_MESSAGE,
  PERMISSION_ERROR_MESSAGE,
  NOT_FOUND_MOVIE_ERROR_MESSAGE,
  NOT_FOUND_USER_ERROR_MESSAGE,
};
