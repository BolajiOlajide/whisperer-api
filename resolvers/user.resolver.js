const User = require('../models/user.model');
const { authError } = require('../utils/errors');

exports.userQueries = {
  users: async (_, args, context) => {
    if (!context.user) return authError();

    const _users = await User.fetchAll();
    return _users.toJSON();
  },
  user: async(_, args, context) => {
    if (!context.user) return authError();

    const _users = await User.fetchAll();
    return _users.toJSON();
  }
}
