const database = require('../db');


module.exports = class Whisper extends database.Model {
  get tableName() { return 'whispers'; }

  whisperer() { return this.belongsTo(require('./user.model'), 'whisperer'); }
}
