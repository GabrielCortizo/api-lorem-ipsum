const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes/routes');
const corsMiddleware = require('./middlewares/corsMiddleware');

require('dotenv').config({
  path: './.env',
});

class AppController {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(bodyParser.json());
    this.server.use(corsMiddleware);
  }

  routes() {
    this.server.use(routes);
    this.server.use((req, res) => {
      res.sendStatus(404);
    });
  }
}

module.exports = new AppController().server;
