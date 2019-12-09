const { userQueries, userMutations } = require('./user.resolver');

module.exports = {
  Query: {
    ...userQueries
  },
  Mutation: {
    ...userMutations
  }
};
