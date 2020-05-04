const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

class UserDataAcess {
  constructor(model) {
    this.model = model;
  }

  async isUsernameUnique(username) {
    const numberOfDocuments = await this.model.count(username);

    return numberOfDocuments === 0;
  }

  findByUsername(username) {
    return this.model.findOne({ username });
  }

  async createUser(user) {
    const { password, username } = user;

    const encryptedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT, 10)
    );

    if (await this.isUsernameUnique(username)) {
      return this.model.create({ ...user, password: encryptedPassword });
    }

    throw Error('username already exists');
  }
}

const userDataAcessInstance = new UserDataAcess(UserModel);

module.exports = userDataAcessInstance;
