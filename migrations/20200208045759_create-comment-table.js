const logger = require('winston');

const {
  COMMENT_TABLE_NAME,
  WHISPER_TABLE_NAME,
  USER_TABLE_NAME
} = require('../utils/constants');


exports.up = function (knex) {
  return knex.schema
    .createTable(COMMENT_TABLE_NAME, table => {
      table.increments().comment(`This is the primary key for the ${COMMENT_TABLE_NAME} table`);
      table.text('comment').notNullable().comment('long string describing this users whisper');
      table.integer('whisper').unsigned().references('id').inTable(WHISPER_TABLE_NAME).onDelete('CASCADE');
      table.integer('whisperer').unsigned().references('id').inTable(USER_TABLE_NAME).onDelete('CASCADE');
      table.timestamp('createdat', { precision: 6 }).defaultTo(knex.fn.now(6));
    }).catch(error => logger.error(error));
};

exports.down = function (knex) {
  return knex
    .schema.dropTable(COMMENT_TABLE_NAME)
    .catch(error => logger.error(error));
};
