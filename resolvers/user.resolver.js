const shortid = require('shortid');

const User = require('../models/user.model');
const { authError, notFoundError, wrongCredError } = require('../utils/errors');
const { createJwt } = require('../utils/jwt');

exports.userQueries = {
  users: async (_, args, context) => {
    if (!context.user) return authError();

    const users = await User.fetchAll({ withRelated: ['whispers'] });
    return users.toJSON();
  },
  profile: async (_, args, context) => {
    if (!context.user) return authError();

    const { id } = context.user;

    const user = await User.where('id', id).fetch({ withRelated: ['whispers'] });

    return user.toJSON();
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
    const token = createJwt(user.id);

    return { user, token };
  },
  signin: async (_, args) => {
    const { email, password } = args.payload;

    let user, _user;

    try {
      _user = await User.where('email', email).fetch();
      user = _user.toJSON();
    } catch {
      user = {}
    }

    if (Object.keys(user).length === 0) {
      return notFoundError(`User with email ${email} doesnt exist!`)
    }

    const isPasswordValid = await _user.compare(password);

    if (!isPasswordValid) return wrongCredError();
    const token = createJwt(user.id);

    return { user, token };
  }
}
