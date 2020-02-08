const Whisper = require('../models/whisper.model');
const User = require('../models/user.model');
const { authError } = require('../utils/errors');
const pubsub = require('../utils/pubsub');
const { WHISPER_ADDED } = require('../utils/constants');


exports.whisperQueries = {
  whispers: async (_, args, context) => {
    if (!context.user) return authError();

    const whispers = await Whisper.fetchAll({ withRelated: ['whisperer'] });
    return whispers.toJSON();
  }
}

exports.whisperMutations = {
  createWhisper: async (_, args, context) => {
    if (!context.user) return authError();

    const _whisper = await new Whisper({
      ...args.payload,
      whisperer: context.user.id
    }).save();

    const _user = await User
      .where('id', context.user.id)
      .fetch();

    const whisper = _whisper.toJSON();
    const user = _user.toJSON();

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
