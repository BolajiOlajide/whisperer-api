const { AuthenticationError, ApolloError } = require('apollo-server-express');


exports.authError = () => {
  throw new AuthenticationError(
    'Authentication token is invalid, please log in',
  );
}

exports.notFoundError = (msg, code = 'RESOURCENOTFOUND') => {
  throw new ApolloError(msg, code)
}

exports.wrongCredError = () => {
  throw new ApolloError(
    'Username or password is incorrect',
    'INCORRECTCREDENTIALS'
  )
}
