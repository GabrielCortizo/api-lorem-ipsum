const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/routes');

dotenv.config({
  path: './.env',
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

app.use((req, res) => {
  res.sendStatus(404);
});

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.APP_PORT, () => {
      console.log('node running in port', process.env.APP_PORT);
    });
  });
