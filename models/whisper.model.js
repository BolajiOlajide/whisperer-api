const database = require('../db');
const User = require('./user.model');


class Whisper extends database.Model {
  get tableName() { return 'whispers'; }

  owner() { return this.belongsTo(User, 'whisperer'); }
}

module.exports = Whisper;
