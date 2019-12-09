const logger = require('winston');

const { USER_TABLE_NAME } = require('../utils/constants');

exports.up = function (knex) {
  return knex.schema
    .createTable(USER_TABLE_NAME, table => {
      table.increments('id').comment('This is the primary key for this table');
      table.string('firstname').notNullable().comment('The firstname identifier for the user');
      table.string('lastname').notNullable();
      table.string('email').notNullable().unique();
      table.string('username').notNullable().comment('randomly generated ID for this user');
      table.string('password').notNullable().comment('hashed password belonging to user');
      table.timestamp('createdat', { precision: 6 }).defaultTo(knex.fn.now(6));
    }).catch(error => logger.error(error));
};

exports.down = function (knex) {
  return knex
    .schema.dropTable(USER_TABLE_NAME)
    .catch(error => logger.error(error));
};
