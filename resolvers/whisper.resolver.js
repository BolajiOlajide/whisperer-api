const knex = require('../db');
const { authError } = require('../utils/errors');
const pubsub = require('../utils/pubsub');
const { WHISPER_ADDED } = require('../utils/constants');
const { WHISPER_TABLE_NAME } = require('../utils/constants');


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

    const whisper = {
      id: whisperId,
      text
    }

    pubsub.publish(WHISPER_ADDED, whisper);

    return whisper;
  }
}

exports.whisperSubscription = {
  whisperAdded: {
    resolve: payload => payload,
    subscribe: () => pubsub.asyncIterator(WHISPER_ADDED),
  }
}
