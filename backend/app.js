const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');

const auth = require('./middlewares/auth');

const routeUsers = require('./routes/user');
const routeCards = require('./routes/card');

const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');

// const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);
// app.use(requestLogger);

app.post('/signup', routeUsers);
app.post('/signin', routeUsers);

app.use(auth);
app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.use((req, res, next) => next(new NotFoundError('Страницы по запрошенному URL не существует')));
// app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
