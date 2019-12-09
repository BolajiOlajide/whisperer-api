const database = require('../db');
const User = require('./user.model');

module.exports = database.Model.extend({
  tableName: 'whisperers',
  whisperer: () => this.belongsTo(User)
});
