const usersRouter = require('express').Router();
const { validateUserUpdate } = require('../middlewares/validations');

const
  {
    getCurrentUser, updateUser,
  } = require('../controllers/users');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', validateUserUpdate, updateUser);

module.exports = usersRouter;
