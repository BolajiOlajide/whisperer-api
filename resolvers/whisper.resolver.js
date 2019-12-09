const Whisper = require('../models/whisper.model');
const User = require('../models/user.model');


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

    const whisper = await new Whisper({
      ...args.payload,
      whisperer: context.user.id
    }).save();

    const user = await User
      .where('id', context.user.id)
      .fetch();

    return {
      ...whisper.toJSON(),
      whisperer: user.toJSON()
    };
  }
}
