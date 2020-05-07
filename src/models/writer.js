const mongoose = require('mongoose');

const { Schema } = mongoose;
const writerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birth: {
    date: { type: Date },
    address: {
      country: String,
      state: String,
    },
  },
  genres: {
    type: [String],
    required: true,
  },
  books: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Book',
    },
  ],
});

module.exports = mongoose.model('Writer', writerSchema);
