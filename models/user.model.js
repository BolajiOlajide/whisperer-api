const database = require('../db');

module.exports = database.Model.extend({
  tableName: 'users',
  bcrypt: { field: 'password' },
  hidden: ['password']
});
