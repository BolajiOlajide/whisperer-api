const database = require('../db');
const Whisper = require('./whisper.model');

module.exports = database.Model.extend({
  tableName: 'users',
  bcrypt: { field: 'password' },
  hidden: ['password'],
  whispers() {
    return this.hasMany(Whisper, 'whisperer')
  }
});
