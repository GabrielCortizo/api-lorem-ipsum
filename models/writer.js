const { getDB } = require('../util/database');

class Writer {
  constructor(name, birth) {
    this.name = name;
    this.birth = birth;
  }

  save() {
    const db = getDB();
    db.collection('writers')
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Writer;
