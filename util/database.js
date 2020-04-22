const mongodb = require('mongodb');

const { MongoClient } = mongodb;

let db;

function mongoConnect(callback) {
  MongoClient.connect('', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .then((client) => {
      console.log('Connected do Mongo');
      db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

const getDB = () => {
  if (db) {
    return db;
  }
  throw Error('No database found');
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
