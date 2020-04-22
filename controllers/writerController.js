const Writer = require('../models/writer');
const { getDB } = require('../util/database');

async function getWriter(req, res) {
  const { name } = req.query;
  console.log(name);
  const db = getDB();
  const items = await db.collection('writers').find({ name }).toArray();

  res.json(items);
}

function postWriter(req, res) {
  const { name, birth } = req.body;
  const writer = new Writer(name, birth);
  writer.save();
  res.sendStatus(200);
}

module.exports = { getWriter, postWriter };
