const Movie = require('../models/movie');
const NotFoundIdError = require('../errors/not-found-id-err');
const NotPermissionError = require('../errors/permission-err');
const BadRequestError = require('../errors/bad-request-err');
const {
  CREATE_OK,
  VALIDATION_ERROR,
  CAST_ERROR,
  BAD_REQUEST_ERROR_MESSAGE,
  PERMISSION_ERROR_MESSAGE,
  NOT_FOUND_MOVIE_ERROR_MESSAGE,

} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration,
    year, description, image, trailer, thumbnail,
    movieId, nameRU, nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(CREATE_OK).send({ data: movie });
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => new NotFoundIdError(NOT_FOUND_MOVIE_ERROR_MESSAGE))
    .then((movie) => {
      if (String(movie.owner) !== req.user._id) {
        // return next(new NotPermissionError(PERMISSION_ERROR_MESSAGE));
        next(new NotPermissionError(PERMISSION_ERROR_MESSAGE));
      }
      Movie.deleteOne(movie)
        .then(() => res.send({ data: movie }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
      }
      return next(err);
    })
    .catch(next);
};
