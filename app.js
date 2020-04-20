const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  const message =
    '<form action="test" method="post">  <input type="text" name="fname"><br> </form>';
  res.send(message).status(200);
});

app.post('/test', (req, res) => {
  console.log(req.body.fname);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Express intro running');
});
