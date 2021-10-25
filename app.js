const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
// const usersRouter = require('./routes/users');
// const { login, logout, createUser } = require('./controllers/users');
// const moviesRouter = require('./routes/movies');
// const auth = require('./middlewares/auth');
// const NotExistRoutError = require('./errors/route-err');
const errorsHandle = require('./middlewares/errors-handle');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
// const { route } = require('./routes/users');
const router = require('./routes/index');
const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;
// const regExp = require('./middlewares/reg-exp');

// const { PORT = 3000 } = process.env;

const app = express();

require('dotenv').config();

app.use(cors);

app.use(helmet());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

// app.post('/signin',
//   celebrate({
//     body: Joi.object().keys({
//       email: Joi.string().required().email(),
//       password: Joi.string().required().min(5),
//     }),
//   }),
//   login);

// app.post('/signout', logout);

// app.post('/signup',
//   celebrate({
//     body: Joi.object().keys({
//       email: Joi.string().required().email(),
//       password: Joi.string().required().min(5),
//       name: Joi.string().min(2).max(30),
//     }),
//   }),
//   createUser);

// app.use(auth);

app.use((req, res, next) => {
  req.user = {
    _id: '617270a1d1da913882a5bba7' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  console.log(req.user)
  next();
});

// app.use('/users', usersRouter);
// app.use('/movies', moviesRouter);

// app.use(() => {
//   throw new NotExistRoutError();
// });

// подключаемся к серверу mongo
// mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/bitfilmsdb', {
// mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorsHandle);

app.listen(PORT, () => {
});
