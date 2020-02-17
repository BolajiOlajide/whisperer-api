const DataLoader = require('dataloader');

const knex = require('../db');
const { WHISPER_TABLE_NAME } = require('../utils/constants');


module.exports = new DataLoader(async keys => {
  const whispers = await knex(WHISPER_TABLE_NAME).select().whereIn('id', keys);

  const whisperMap = {};
  whispers.forEach(whisper => whisperMap[whisper.id] = whisper);

  return keys.map(key => whisperMap[key]);
});

