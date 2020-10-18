const logger = require('winston');

const {
  COMMENT_TABLE_NAME,
} = require('../utils/constants');


exports.up = function (knex) {
  return knex.schema
    .alterTable(COMMENT_TABLE_NAME, table => {
      table.renameColumn('whisperer', 'commenter');
    }).catch(error => logger.error(error));
};

exports.down = function (knex) {
  return knex.schema
    .alterTable(COMMENT_TABLE_NAME, table => {
      table.renameColumn('commenter', 'whisperer');
    })
    .catch(error => logger.error(error));
};
