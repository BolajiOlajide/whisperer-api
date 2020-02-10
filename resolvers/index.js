const { userQueries, userMutations } = require('./user.resolver');
const { whisperQueries, whisperMutations, whisperSubscription } = require('./whisper.resolver');

module.exports = {
  Whisper: {
    whisperer: (parent, _, context) => {
      return context.userLoader.load(parent.whisperer)
    }
  },
  Query: {
    ...userQueries,
    ...whisperQueries
  },
  Mutation: {
    ...whisperMutations,
    ...userMutations
  },
  Subscription: {
    ...whisperSubscription
  }
};
