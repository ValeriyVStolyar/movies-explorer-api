const router = require('express').Router();
const auth = require('../middlewares/auth');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const { validateUserBody, validateAuthentication } = require('../middlewares/validations');
const NotExistRoutError = require('../errors/route-err');
const {
  ROUTE_ERROR_MESSAGE,
} = require('../utils/constants');
const
  {
    createUser, login, logout,
  } = require('../controllers/users');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateAuthentication, login);

// router.use((req, res, next) => {
  // req.user = {
    // _id: '617d06b15703aa4ea6880b0c' // вставьте сюда _id созданного в предыдущем пункте пользователя
  // };

  // next();
// });

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.post('/signout', logout);
router.use((req, res, next) => next(new NotExistRoutError(ROUTE_ERROR_MESSAGE)));

module.exports = router;
