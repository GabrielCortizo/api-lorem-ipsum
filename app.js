const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/routes');
const { mongoConnect } = require('./util/database');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

app.use((req, res) => {
  res.sendStatus(404);
});

mongoConnect(() => {
  app.listen(3000, () => {
    console.log('Express intro running');
  });
});
