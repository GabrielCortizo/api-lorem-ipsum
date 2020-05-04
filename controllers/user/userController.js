const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { generateNewToken } = require('../../middlewares/auth');
const userDataAcess = require('../../data-acess/user');

exports.postSignUp = async (req, res) => {
  const schemaErrors = validationResult(req);
  if (!schemaErrors.isEmpty()) {
    return res.status(400).json(schemaErrors);
  }

  const { username, password } = req.body;

  try {
    const user = await userDataAcess.createUser({ username, password });
    res.sendStatus(200);
  } catch (err) {
    res.json(err.toString());
  }
  return null;
};

exports.postSignIn = async (req, res) => {
  const schemaErrors = validationResult(req);
  if (!schemaErrors.isEmpty()) {
    return res.status(400).json(schemaErrors);
  }

  const { username, password } = req.body;
  console.log(username, password);

  const user = await userDataAcess.findByUsername(username);
  if (user) {
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      const token = generateNewToken(username);
      return res.json({ token });
    }
  }

  return res.json({ errorMessage: 'User Not Found' });
};
