const shortid = require('shortid');
const R = require('ramda');

const knex = require('../db');
const { authError, notFoundError, wrongCredError } = require('../utils/errors');
const { createJwt } = require('../utils/jwt');
const {
  USER_TABLE_NAME,
  WHISPER_TABLE_NAME,
} = require('../utils/constants');
const { encryptPassword, comparePassword } = require('../utils/password');
const { pluckWhispers, pluckWhisperer } = require('../utils');

exports.userQueries = {
  users: async (_, __, context) => {
    if (!context.user) return authError();

    return knex(USER_TABLE_NAME)
      .select('id', 'email', 'username');
  },
  profile: async (_, args, context) => {
    if (!context.user) return authError();

    const { id } = context.user;

    const joinQuery = [
      WHISPER_TABLE_NAME,
      `${WHISPER_TABLE_NAME}.whisperer`,
      `${USER_TABLE_NAME}.id`
    ];
    const result = await knex(USER_TABLE_NAME)
      .select('*')
      .leftJoin(...joinQuery)
      .options({ nestTables: true }) // only available in MySQL
      .where(`${USER_TABLE_NAME}.id`, id);

    const whispers = pluckWhispers(result);
    const whisperer = pluckWhisperer(result);

    return { ...whisperer, whispers: whispers };
  }
}

exports.userMutations = {
  createUser: async (_, args, context) => {
    const username = shortid.generate();

    const {
      password,
      confirmPassword,
      email
    } = args.payload;

    if (password !== confirmPassword) {
      throw new Error('Password and confirmPassword don\'t match');
    }

    const encryptedPassword = encryptPassword(args.payload.password);

    const [userId] = await knex(USER_TABLE_NAME)
      .insert({
        email,
        username,
        password: encryptedPassword
      });

    const token = createJwt(userId);
    const user = await knex(USER_TABLE_NAME)
      .select()
      .where('id', userId)
      .first();

    const { password: userPassword, ...userInfo } = user;

    return { user: userInfo, token };
  },
  signin: async (_, args, context) => {
    const { email, password } = args.payload;

    const user = await knex(USER_TABLE_NAME)
      .select('*')
      .where('email', email)
      .first();

    if (R.isNil(user)) {
      return notFoundError(`User with email ${email} doesnt exist!`)
    }

    const { password: userPassword, ...userInfo } = user;

    const isPasswordValid = comparePassword(password, userPassword);

    if (!isPasswordValid) return wrongCredError();

    const token = createJwt(userInfo.id);

    return { user: userInfo, token };
  }
}
