function getBook(req, res) {
  res.sendStatus(404);
}

function postBook(req, res) {
  console.log(req.body);
  res.sendStatus(200);
}

module.exports = { getBook, postBook };
