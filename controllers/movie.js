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
  const { country, director, duration,
  year, description, image, trailer, thumbnail,
  owner, movieId, nameRU, nameEN
  } = req.body;
  console.log(req.body)
  console.log(owner)

  Movie.create({ country, director, duration,
    year, description, image, trailer, thumbnail,
    owner, movieId, nameRU, nameEN, owner: req.user._id })
    .then((movie) => {
      console.log(movie)
      res.status(CREATE_OK).send({ data: movie });
    })
    .catch((err) => {
      console.log(err)
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

// module.exports.likeCard = (req, res, next) => {
//   /*
//   console.log('req.user in likeCard')
//   console.log(req.user)
//   console.log('req.user._id')
//   console.log(req.user._id)
//   console.log('typeof req.user._id')
//   console.log(typeof req.user._id)
//   console.log('req.params.cardId in likeCard')
//   console.log(req.params.cardId)
//   */
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
//     { new: true },
//   )
//     .orFail(new NotFoundIdError('Карточка с указанным _id не найдена.'))
//     .then((card) => {
//       // if (card.owner._id !== req.user._id) {
//       // if (card.owner !== req.user._id) {
//       // if (String(card.owner) !== req.user._id) {
//       // throw new NotPermissionError();
//       // }
//       res.send({ data: card });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         throw new ValidationError();
//       }

//       if (err.name === 'ValidationError') {
//         throw new WrongDataError('Переданы некорректные данные для постановки лайка.');
//       }
//       next(err);
//     })
//     .catch(next);
// };

// module.exports.dislikeCard = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $pull: { likes: req.user._id } }, // убрать _id из массива
//     { new: true },
//   )
//     .orFail(new NotFoundIdError('Карточка с указанным _id не найдена.'))
//     .then((card) => {
//       // if (card.owner._id !== req.user._id) {
//       // if (card.owner !== req.user._id) {
//       // if (String(card.owner) !== req.user._id) {
//       // throw new NotPermissionError();
//       // }
//       res.send({ data: card });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         throw new ValidationError();
//       }

//       if (err.name === 'ValidationError') {
//         throw new WrongDataError('Переданы некорректные данные для снятии лайка.');
//       }
//       next(err);
//     })
//     .catch(next);
// };
