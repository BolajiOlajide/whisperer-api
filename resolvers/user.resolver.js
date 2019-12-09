const shortid = require('shortid');

const User = require('../models/user.model');
const { authError } = require('../utils/errors');
const { createJwt } = require('../utils/jwt');

exports.userQueries = {
  users: async (_, args, context) => {
    if (!context.user) return authError();

    const _users = await User.fetchAll();
    return _users.toJSON();
  },
  profile: async(_, args, context) => {
    if (!context.user) return authError();

    const _users = await User.fetchAll();
    return _users.toJSON();
  },
  signin: async (_, args, context) => {
    return null
  }
}

exports.userMutations = {
  createUser: async (_, args) => {
    const username = shortid.generate();
    const _user = await new User({
      ...args.payload,
      username
    }).save();
    const user = _user.toJSON();
    const token = await createJwt(user.id);

    return { user, token };
  }
}
