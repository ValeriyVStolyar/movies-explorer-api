const Movie = require('../models/movie');
const NotFoundIdError = require('../errors/not-found-id-err');
const ValidationError = require('../errors/cast-err');
const WrongDataError = require('../errors/data_err');
const NotPermissionError = require('../errors/permission-err');

const CREATE_OK = 201;

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new WrongDataError('Переданы некорректные данные при создании карточки.');
      }
      next(err);
    })
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
      if (err.name === 'ValidationError') {
        throw new WrongDataError('Переданы некорректные данные при создании карточки.');
      }
      next(err);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => new NotFoundIdError('Карточка с указанным _id не найдена.'))
    .then((movie) => {
      if (String(movie.owner) !== req.user._id) {
        next(new NotPermissionError('Нельзя удалить чужую карточку'));
      } else {
        Movie.deleteOne(movie)
          .then(() => res.send({ data: movie }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError();
      }
      next(err);
    })
    .catch(next);
};
