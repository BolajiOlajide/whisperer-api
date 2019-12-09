const database = require('../db');
const User = require('./user.model');

module.exports = bookshelf.Model.extend({
  tableName: 'whisperers',
  user: () => this.belongsTo(User)
});
