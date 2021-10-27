const moviesRouter = require('express').Router();
const { validateMovieBody, validateMovieDelete } = require('../middlewares/validations');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movie');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', validateMovieBody, createMovie);
moviesRouter.delete('/:movieId', validateMovieDelete, deleteMovie);

module.exports = moviesRouter;
