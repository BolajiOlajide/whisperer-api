const shortid = require('shortid');
const R = require('ramda');

const knex = require('../db');
const { authError, notFoundError, wrongCredError } = require('../utils/errors');
const { createJwt } = require('../utils/jwt');
const { USER_TABLE_NAME } = require('../utils/constants');
const { encryptPassword, comparePassword } = require('../utils/password');

exports.userQueries = {
  users: async (_, args, context) => {
    if (!context.user) return authError();

    return knex(USER_TABLE_NAME)
      .select('id', 'firstname', 'lastname', 'email', 'username');
  },
  profile: async (_, args, context) => {
    if (!context.user) return authError();

    const { id } = context.user;

    return knex(USER_TABLE_NAME)
      .select('id', 'firstname', 'lastname', 'email', 'username')
      .where('id', id);
  }
}

exports.userMutations = {
  createUser: async (_, args) => {
    const username = shortid.generate();
    const password = encryptPassword(args.payload.password);

    const user = await knex(USER_TABLE_NAME)
      .insert({
        ...args.payload,
        username,
        password
      });
    const token = createJwt(user.id);

    return { user, token };
  },
  signin: async (_, args) => {
    const { email, password } = args.payload;

    const user = await knex(USER_TABLE_NAME)
      .select('id', 'firstname', 'lastname', 'email', 'username')
      .where('email', email);

    if (R.isEmpty(user)) {
      return notFoundError(`User with email ${email} doesnt exist!`)
    }

    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) return wrongCredError();

    const token = createJwt(user.id);

    return { user, token };
  }
}
