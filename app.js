const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const cards = require('./routes/cards');

const NOT_FOUND_ERROR = 404;

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '63ecc1b0c7824f12f40107ca',
  };

  next();
});

app.use('/users', users);
app.use('/cards', cards);
app.use((req, res, next) => {
  next(res.status(NOT_FOUND_ERROR).send('Ресурс не найден'));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
