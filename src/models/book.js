const mongoose = require('mongoose');

const { Schema } = mongoose;
const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isbn13: {
    type: String,
    required: true,
  },
  writer: {
    type: String,
    required: true,
  },
  genres: {
    type: Array,
    require: false,
  },
  publish_date: {
    type: Date,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('Book', bookSchema);
