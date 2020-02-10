const DataLoader = require('dataloader');

const knex = require('../db');
const { USER_TABLE_NAME } = require('../utils/constants');


module.exports = new DataLoader(async keys => {
  const users = await knex(USER_TABLE_NAME).select().whereIn('id', keys);

  const userMap = {};
  users.forEach(user => userMap[user.id] = user);

  return keys.map(key => userMap[key]);
});

