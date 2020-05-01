const { validationResult } = require('express-validator');
const WriterDataAcess = require('../../data-acess/writer');

async function getWriter(req, res) {
  const schemaErrors = validationResult(req);
  if (!schemaErrors.isEmpty()) {
    res.status(400).json(schemaErrors);
  }

  const { id } = req.params;
  try {
    const writer = await WriterDataAcess.findByID(id);
    res.json(writer);
  } catch (err) {
    res.sendStatus(404);
  }
}

async function postWriter(req, res) {
  const schemaErrors = validationResult(req);
  if (!schemaErrors.isEmpty()) {
    res.status(400).json(schemaErrors);
  }
  const writerDTO = req.body;
  try {
    const ans = await WriterDataAcess.createWriter(writerDTO);
    console.log(ans);
    res.json(ans);
  } catch (err) {
    res.json({ error: { msg: 'Error to save the data' } }).sendStatus(500);
  }
}

module.exports = { getWriter, postWriter };
