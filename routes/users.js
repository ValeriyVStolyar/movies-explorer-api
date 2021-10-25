const usersRouter = require('express').Router();
const { validateUserUpdate } = require('../middlewares/validations');

const
  {
    getCurrentUser, updateUser,
    // getUsers,
  } = require('../controllers/users');

// usersRouter.get('/', getUsers);

usersRouter.get('/me', getCurrentUser);

// usersRouter.get('/:userId',
//   celebrate({
//     params: Joi.object().keys({
//       userId: Joi.string().hex().length(24),
//     }),
//   }),
//   getUserById);

usersRouter.patch('/me', validateUserUpdate, updateUser);

// usersRouter.patch('/me/avatar',
//   celebrate({
//     body: Joi.object().keys({
//       avatar: Joi.string().required()
//         .pattern(/^https?:\/{2}(w{3}\.)?((((\w+[-]*))*)\.[a-z]{2,6}((\/?\w+\/?){1,9})?|(((\w*\.){1,9}([a-z]){1,6}(\/\w*[-]*){1,9}(\w*)(\.[a-z]+))))(#)?/),
//     }),
//   }),
//   updateAvatar);

module.exports = usersRouter;
