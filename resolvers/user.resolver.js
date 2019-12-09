const User = require('../models/user.model');

exports.userQueries = {
  users: async () => {
    const _users = await User.fetchAll();
    return _users.toJSON();
  }
}
