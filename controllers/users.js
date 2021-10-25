const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const NotFoundIdError = require('../errors/not-found-id-err');
const ValidationError = require('../errors/cast-err');
const EmptyFieldError = require('../errors/empty-field-err');
const ExistUserError = require('../errors/exist-user-err');
const WrongDataError = require('../errors/data_err');

const CREATE_OK = 201;

// module.exports.getUsers = (req, res, next) => {
//   User.find({})
//     .then((users) => {
//       res.send({ data: users });
//     })
//     .catch((err) => {
//       if (err.message === 'ValidationError') {
//         throw new WrongDataError('Переданы некорректные данные.');
//       }
//       next(err);
//     })
//     .catch(next);
// };

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundIdError('Пользователь по указанному _id не найден.'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError();
      }
      next(err);
    })
    .catch(next);
};

// module.exports.getUserById = (req, res, next) => {
//   User.findById(req.params.userId)
//     .orFail(new NotFoundIdError('Пользователь по указанному _id не найден.'))
//     .then((user) => {
//       res.send({ data: user });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         throw new ValidationError();
//       }
//       next(err);
//     })
//     .catch(next);
// };

module.exports.createUser = (req, res, next) => {
  const {
    // name, about, avatar, email, password,
    name, email, password,
  } = req.body; // достанем идентификатор
  if (!email || !password) {
    throw new EmptyFieldError();
  }

  User.findOne({ email })
    .then((userr) => {
      if (userr) {
        throw new ExistUserError();
      } else {
        bcrypt.hash(password, 10)
          .then((hash) => {
            User.create({
              // name, about, avatar, email, password: hash,
              name, email, password: hash,
            })
              .then((user) => {
                res.status(CREATE_OK).send({ data: user.toJSON() });
              })
              .catch((err) => {
                if (err.name === 'ValidationError') {
                  throw new WrongDataError('Переданы некорректные данные при создании пользователя.');
                }

                next(err);
              });
          });
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }, // токен будет просрочен через 7 дней после создания
      );

      // вернём токен
      res
        .cookie('jwt', token, {
          httpOnly: true,
          sameSite: 'None',
          secure: true,
        })
        .send({ token });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Cookies удалены'});
}

module.exports.updateUser = (req, res, next) => {
  // const { name, about } = req.body; // достанем идентификатор
  const { name } = req.body; // достанем идентификатор

  User.findByIdAndUpdate(
    // req.user._id, { name, about }, { new: true, runValidators: true },
    req.user._id, { name }, { new: true, runValidators: true },
  )
    .orFail(new NotFoundIdError('Пользователь по указанному _id не найден.'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError();
      } if (err.message === 'NotValidId') {
        throw new NotFoundIdError('Пользователь по указанному _id не найден.');
      } if (err.name === 'ValidationError') {
        throw new WrongDataError('Переданы некорректные данные при обновлении профиля.');
      } if (err.name === 'IdError') {
        throw new NotFoundIdError('Пользователь по указанному _id не найден.');
      }
      next(err);
    })
    .catch(next);
};

// module.exports.updateAvatar = (req, res, next) => {
//   const { avatar } = req.body; // достанем идентификатор

//   User.findByIdAndUpdate(
//     req.user._id, { avatar }, { new: true, runValidators: true },
//   )
//     .orFail(new NotFoundIdError('Пользователь по указанному _id не найден.'))
//     .then((user) => {
//       res.send({ data: user });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         throw new ValidationError();
//       } if (err.message === 'NotValidId') {
//         throw new NotFoundIdError('Пользователь по указанному _id не найден.');
//       } if (err.name === 'ValidationError') {
//         throw new WrongDataError('Переданы некорректные данные при обновлении аватара.');
//       } if (err.name === 'IdError') {
//         throw new NotFoundIdError('Пользователь по указанному _id не найден.');
//       }
//       next(err);
//     })
//     .catch(next);
// };
