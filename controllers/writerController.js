function getWriter(req, res) {
  res.sendStatus(404);
}

function postWriter(req, res) {
  console.log(req.body);
  res.sendStatus(200);
}

module.exports = { getWriter, postWriter };
