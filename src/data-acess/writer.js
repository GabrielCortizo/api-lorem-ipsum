const Writer = require('../models/writer');

class WriterDataAcess {
  constructor(model) {
    this.Model = model;
  }

  createWriter(writer) {
    return this.Model.create(writer);
  }

  findByID(id) {
    return this.Model.findById(id, '-__v').populate(
      'books',
      '-__v -_id -writer'
    );
  }

  deleteByID(id) {
    return this.Model.findByIdAndDelete(id);
  }
}
const writerDataAcessInstance = new WriterDataAcess(Writer);
module.exports = writerDataAcessInstance;
