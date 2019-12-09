const database = require('../db');
const User = require('./user.model');


class Whisper extends database.Model {
  get tableName() { return 'whisperers'; }

  whisperer() { return this.belongsTo(User, 'whisperer'); }
}

module.exports = Whisper;
