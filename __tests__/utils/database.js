const mongoose = require('mongoose');
const writerDataAcess = require('../../src/data-acess/writer');

exports.connectToMockedDatabase = () => {
  return mongoose.connect(
    global.__MONGO_URI__,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    }
  );
};
