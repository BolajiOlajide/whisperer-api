const knex = require('../db');
const { authError } = require('../utils/errors');
const pubsub = require('../utils/pubsub');
const { WHISPER_ADDED } = require('../utils/constants');
const { USER_TABLE_NAME, WHISPER_TABLE_NAME } = require('../utils/constants');


exports.whisperQueries = {
  whispers: async (_, __, context) => {
    if (!context.user) return authError();

    return knex(WHISPER_TABLE_NAME).select()
  }
}

exports.whisperMutations = {
  createWhisper: async (_, args, context) => {
    if (!context.user) return authError();

    const { text } = args.payload

    const [whisperId] = await knex(WHISPER_TABLE_NAME)
      .insert({ text, whisperer: context.user.id });

    const whisperer = await knex(USER_TABLE_NAME)
      .select()
      .where('id', context.user.id)
      .first();

    const whisper = {
      id: whisperId,
      text
    }

    const response = { whisperer, ...whisper  };

    pubsub.publish(WHISPER_ADDED, response)

    return response;
  }
}

exports.whisperSubscription = {
  whisperAdded: {
    resolve: payload => payload,
    subscribe: () => pubsub.asyncIterator(WHISPER_ADDED),
  }
}
