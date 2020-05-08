const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { generateNewToken } = require('../../../middlewares/auth');
const userDataAcess = require('../../../data-acess/user');

exports.postSignUp = async (req, res) => {
  const schemaErrors = validationResult(req);
  if (!schemaErrors.isEmpty()) {
    return res.status(400).json(schemaErrors);
  }

  const { username, password } = req.body;

  try {
    const user = await userDataAcess.createUser({ username, password });
    return res.sendStatus(201);
  } catch (err) {
    return res.status(422).json(err.toString());
  }
};

exports.postSignIn = async (req, res) => {
  const schemaErrors = validationResult(req);
  if (!schemaErrors.isEmpty()) {
    return res.status(400).json(schemaErrors);
  }

  const { username, password } = req.body;
  const user = await userDataAcess.findByUsername(username);
  if (user) {
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      const token = generateNewToken(username);
      return res.status(200).json({ token });
    }
  }

  return res.status(401).json({ errorMessage: 'Failed to authenticate user' });
};
