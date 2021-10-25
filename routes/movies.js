const moviesRouter = require('express').Router();
const { validateMovieBody, validateMovieDelete } = require('../middlewares/validations');

const {
  getMovies, createMovie, deleteMovie,
  // likeCard, dislikeCard,
} = require('../controllers/movie');

moviesRouter.get('/', getMovies);

// router.use((req, res, next) => {
//   req.movie = {
//     movieId: '1' // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };
//   // console.log(req.user)
//   next();
// });

moviesRouter.post('/', validateMovieBody,
  // celebrate({
  //   body: Joi.object().keys({
  //     country: Joi.string().required(),
  //     director: Joi.string().required(),
  //     duration: Joi.string().required(),
  //     year: Joi.string().required(),
  //     description: Joi.string().required(),
  //     image: Joi.string().required()
  //       .pattern(/^https?:\/{2}(w{3}\.)?((((\w+[-]*))*)\.[a-z]{2,6}((\/?\w+\/?){1,9})?|(((\w*\.){1,9}([a-z]){1,6}(\/\w*[-]*){1,9}(\w*)(\.[a-z]+))))(#)?/),
  //     trailer: Joi.string().required()
  //       .pattern(/^https?:\/{2}(w{3}\.)?((((\w+[-]*))*)\.[a-z]{2,6}((\/?\w+\/?){1,9})?|(((\w*\.){1,9}([a-z]){1,6}(\/\w*[-]*){1,9}(\w*)(\.[a-z]+))))(#)?/),
  //     thumbnail: Joi.string().required()
  //       .pattern(/^https?:\/{2}(w{3}\.)?((((\w+[-]*))*)\.[a-z]{2,6}((\/?\w+\/?){1,9})?|(((\w*\.){1,9}([a-z]){1,6}(\/\w*[-]*){1,9}(\w*)(\.[a-z]+))))(#)?/),
  //     nameRU: Joi.string().required(),
  //     nameEN: Joi.string().required(),
  //   }),
  // }),
  createMovie);

moviesRouter.delete('/:movieId', validateMovieDelete,
  // celebrate({
  //   params: Joi.object().keys({
  //     cardId: Joi.string().hex().length(24),
  //   }),
  // }),
  deleteMovie);

// moviesRouter.put('/:cardId/likes',
//   celebrate({
//     params: Joi.object().keys({
//       cardId: Joi.string().hex().length(24),
//     }),
//   }),
//   likeCard);

// moviesRouter.delete('/:cardId/likes',
//   celebrate({
//     params: Joi.object().keys({
//       cardId: Joi.string().hex().length(24),
//     }),
//   }),
//   dislikeCard);

module.exports = moviesRouter;
