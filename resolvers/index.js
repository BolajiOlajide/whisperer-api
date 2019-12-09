const { userQueries } = require('./user.resolver');

module.exports = {
  Query: {
    ...userQueries
  }
};
