const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const NotFoundIdError = require('../errors/not-found-id-err');
const ConflictError = require('../errors/conflict_err');
const BadRequestError = require('../errors/bad-request-err');
const {
  BAD_REQUEST_ERROR_MESSAGE, CONFLICT_ERROR_MESSAGE,
  VALIDATION_ERROR, NOT_FOUND_USER_ERROR_MESSAGE,
} = require('../utils/constants');

const CREATE_OK = 201;

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundIdError(NOT_FOUND_USER_ERROR_MESSAGE))
    .then((user) => {
      // res.send({ data: user });
      res.send({ user });
    })
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  User.findOne({ email })
    .then((userr) => {
      if (userr) {
        next(new ConflictError(CONFLICT_ERROR_MESSAGE));
      }
      bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            name, email, password: hash,
          })
            .then((user) => {
              res.status(CREATE_OK).send({ data: user.toJSON() });
            })
            .catch((err) => {
              if (err.name === VALIDATION_ERROR) {
                return next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
              } if (err.code === 11000) {
                return next(new ConflictError(CONFLICT_ERROR_MESSAGE));
              }
              return next(err);
            });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

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
  res.clearCookie('jwt').send({ message: 'Cookies удалены' });
  // next();
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id, { email, name }, { new: true, runValidators: true },
  )
    .orFail(new NotFoundIdError('Пользователь по указанному _id не найден.'))
    .then((user) => {
      // res.send({ data: user });
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
      } if (err.code === 11000) {
        return next(new ConflictError(CONFLICT_ERROR_MESSAGE));
      }
      return next(err);
    });
};
