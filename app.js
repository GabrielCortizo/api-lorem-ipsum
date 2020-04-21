const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => {
  console.log('Express intro running');
});
