const { AuthenticationError } = require('apollo-server-express');


exports.authError = () => {
  throw new AuthenticationError(
    'Authentication token is invalid, please log in',
  );
}
