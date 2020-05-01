const Writer = require('../models/writer');

class WriterDataAcess {
  constructor(model) {
    this.Model = model;
  }

  findByID(id) {
    return this.Model.findById(id, '-__v').populate(
      'books',
      '-__v -_id -writer'
    );
  }

  createWriter(writer) {
    return this.Model.create(writer);
  }
}
const writerDataAcessInstance = new WriterDataAcess(Writer);
module.exports = writerDataAcessInstance;
