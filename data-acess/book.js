const WriterDataAcess = require('./writer');
const Book = require('../models/book');

class BookDataAcess {
  constructor(Model) {
    this.Model = Model;
  }

  async createBook(bookDTO) {
    const writerID = bookDTO.writer_id;
    const writer = await WriterDataAcess.findByID(writerID);
    if (!writer) {
      throw Error('writer not founded');
    }

    const book = await this.Model.create({ ...bookDTO, writer: writer.name });
    await writer.books.push(book._id);
    return book;
  }

  findByFields(fields) {
    return this.Model.find(fields, '-_id -__v');
  }

  findByID(id) {
    return this.Model.find({ _id: id });
  }
}

const bookDataAcessInstance = new BookDataAcess(Book);

module.exports = bookDataAcessInstance;
