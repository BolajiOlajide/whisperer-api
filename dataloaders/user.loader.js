const DataLoader = require('dataloader');

const db = require('../db');


module.exports = new DataLoader(async keys => {
  const users = await db.knex.select().whereIn('id', keys);

  const userMap = {};
  users.forEach(user => userMap[user.id] = user);

  return keys.map(key => userMap[key]);
});

