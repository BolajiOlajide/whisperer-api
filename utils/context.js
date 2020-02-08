const jwt = require('jsonwebtoken');
const config = require('lazy-config');

const userLoader = require('../dataloaders/user.loader');


module.exports = ({ req, connection }) => {
  if (connection) {
    return connection.context;
  }
  const token = req.headers.authorization || '';
  let user;

  try {
    user = jwt.verify(token, config.authentication.secret);
  } catch {
    user = null;
  }

  return { user, userLoader }
}
