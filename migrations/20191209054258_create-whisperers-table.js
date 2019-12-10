const logger = require('winston');

const { WHISPERER_TABLE_NAME } = require('../utils/constants');


exports.up = function (knex) {
  return knex.schema
    .createTable(WHISPERER_TABLE_NAME, table => {
      table.increments().comment(`This is the primary key for the ${WHISPERER_TABLE_NAME} table`);
      table.text('text').notNullable().comment('long string describing this users whisper');
      table.integer('whisperer').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.timestamp('createdat', { precision: 6 }).defaultTo(knex.fn.now(6));
    }).catch(error => logger.error(error));
};

exports.down = function (knex) {
  return knex
    .schema.dropTable(WHISPERER_TABLE_NAME)
    .catch(error => logger.error(error));
};
