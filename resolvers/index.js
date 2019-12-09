const { userQueries, userMutations } = require('./user.resolver');
const { whisperQueries, whisperMutations } = require('./whisper.resolver');

module.exports = {
  Query: {
    ...userQueries,
    ...whisperQueries
  },
  Mutation: {
    ...whisperMutations,
    ...userMutations
  }
};
