const { celebrate, Joi } = require('celebrate');
const { regExp } = require('./reg-exp');

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    name: Joi.string().min(2).max(30),
  }),
})

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
})

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
  }),
})

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regExp),
    // image: Joi.string().required().pattern(/^https?:\/{2}(w{3}\.)?((((\w+[-]*))*)\.[a-z]{2,6}((\/?\w+\/?){1,9})?|(((\w*\.){1,9}([a-z]){1,6}(\/\w*[-]*){1,9}(\w*)(\.[a-z]+))))(#)?/),
    trailer: Joi.string().required().pattern(regExp),
    // trailer: Joi.string().required().pattern(/^https?:\/{2}(w{3}\.)?((((\w+[-]*))*)\.[a-z]{2,6}((\/?\w+\/?){1,9})?|(((\w*\.){1,9}([a-z]){1,6}(\/\w*[-]*){1,9}(\w*)(\.[a-z]+))))(#)?/),
    thumbnail: Joi.string().required().pattern(regExp),
    // thumbnail: Joi.string().required().pattern(/^https?:\/{2}(w{3}\.)?((((\w+[-]*))*)\.[a-z]{2,6}((\/?\w+\/?){1,9})?|(((\w*\.){1,9}([a-z]){1,6}(\/\w*[-]*){1,9}(\w*)(\.[a-z]+))))(#)?/),
    movieId:Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
})

const validateMovieDelete  = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
})

module.exports = {
  validateUserBody,
  validateAuthentication,
  validateUserUpdate,
  validateMovieBody,
  validateMovieDelete
};