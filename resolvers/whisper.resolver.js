const knex = require('../db');
const { authError } = require('../utils/errors');
const pubsub = require('../utils/pubsub');
const { WHISPER_ADDED } = require('../utils/constants');
const { USER_TABLE_NAME, WHISPER_TABLE_NAME } = require('../utils/constants');


exports.whisperQueries = {
  whispers: async (_, args, context) => {
    if (!context.user) return authError();

    return knex(WHISPER_TABLE_NAME)
      .select(`${WHISPER_TABLE_NAME}.*, ${USER_TABLE_NAME}.* AS whisperer`)
      .innerJoin(USER_TABLE_NAME, `${USER_TABLE_NAME}.id`, `${WHISPER_TABLE_NAME}.whisperer`)
  }
}

exports.whisperMutations = {
  createWhisper: async (_, args, context) => {
    if (!context.user) return authError();

    const whisper = await knex(WHISPER_TABLE_NAME)
      .insert({ ...args.payload, whisperer: context.user.id });

    const user = await knex(USER_TABLE_NAME)
      .where('id', context.user.id)
      .select();

    pubsub.publish(WHISPER_ADDED, { user: user.username, whisper: whisper.text })

    return {
      ...whisper,
      whisperer: user
    };
  }
}

exports.whisperSubscription = {
  whisperAdded: {
    resolve: async payload => payload,
    subscribe: () => pubsub.asyncIterator(WHISPER_ADDED),
  }
}
