const { celebrate, Joi } = require('celebrate');
const { regExp } = require('./reg-exp');

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email адресом')
      .messages({
        'string.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().min(5)
      .messages({
        'any.required': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().min(2).max(30),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email адресом')
      .messages({
        'string.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().min(5)
      .messages({
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'any.required': 'Поле "name" должно быть заполнено',
      }),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': 'Поле "country" должно быть заполнено',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Поле "director" должно быть заполнено',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Поле "duration" должно быть заполнено',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Поле "year" должно быть заполнено',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Поле "description" должно быть заполнено',
      }),
    image: Joi.string().required().pattern(regExp)
      .message('Поле "image" должно быть валидным url адресом')
      .messages({
        'string.required': 'Поле "image" должно быть заполнено',
      }),
    trailer: Joi.string().required().pattern(regExp)
      .message('Поле "trailer" должно быть валидным url адресом')
      .messages({
        'string.required': 'Поле "trailer" должно быть заполнено',
      }),
    thumbnail: Joi.string().required().pattern(regExp)
      .message('Поле "thumbnail" должно быть валидным url адресом')
      .messages({
        'string.required': 'Поле "thumbnail" должно быть заполнено',
      }),
    movieId: Joi.number().required()
      .messages({
        'any.required': 'Поле "movieId" должно быть заполнено',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Поле "nameRU" должно быть заполнено',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Поле "nameEN" должно быть заполнено',
      }),
  }),
});

const validateMovieDelete = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateUserBody,
  validateAuthentication,
  validateUserUpdate,
  validateMovieBody,
  validateMovieDelete,
};
