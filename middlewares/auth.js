const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
  const token = retrievetBearerTokenFromRequest(req);
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err) => {
    if (err) {
      return res.sendStatus(401);
    }

    return next();
  });
}

function retrievetBearerTokenFromRequest(req) {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    const beaterToken = bearerHeader.split(' ')[1];
    return beaterToken;
  }

  return '';
}

function generateToken(req, res) {
  jwt.sign(
    {},
    process.env.JWT_TOKEN_SECRET,
    { expiresIn: 60 },
    (err, token) => {
      if (err) {
        return res.status(400).json(err);
      }

      return res.json({
        token,
      });
    }
  );
}

module.exports = { generateToken, authentication };
