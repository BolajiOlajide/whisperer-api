const database = require('../db');
const Whisper = require('./whisper.model');

const User = database.Model.extend({
  tableName: 'users',
  bcrypt: { field: 'password' },
  hidden: ['password'],
  whispers() {
    return this.hasMany(Whisper, 'whisperer')
  }
});

module.exports = User;
