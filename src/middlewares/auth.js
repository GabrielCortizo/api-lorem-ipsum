const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
  const token = retrieveBearerTokenFromRequest(req);
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err) => {
    if (err) {
      return res.sendStatus(401);
    }

    return next();
  });
}

function retrieveBearerTokenFromRequest(req) {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    const beaterToken = bearerHeader.split(' ')[1];
    return beaterToken;
  }

  return '';
}

function generateNewToken(data) {
  return jwt.sign({ data }, process.env.JWT_TOKEN_SECRET, { expiresIn: 60 });
}

module.exports = { generateNewToken, authentication };
