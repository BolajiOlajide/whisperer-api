const knex = require('knex');
const bookshelf = require('bookshelf');
const bookshelfBcrypt = require('bookshelf-bcrypt');
const knexConfig = require('./knexfile');


const bookshelfInstance = bookshelf(knex(knexConfig));

bookshelfInstance.plugin(bookshelfBcrypt);

module.exports = bookshelfInstance;
