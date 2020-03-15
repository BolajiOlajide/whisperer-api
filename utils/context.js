const jwt = require('jsonwebtoken');
const config = require('lazy-config');

const userLoader = require('../dataloaders/user.loader');
const whisperLoader = require('../dataloaders/whisper.loader');


module.exports = ({ req, connection, res }) => {
  if (connection) {
    return connection.context;
  }

  console.log(req.cookies);
  const token = req.cookies.token || req.headers.authorization || '';
  let user;

  if (token) {
    try {
      user = jwt.verify(token, config.authentication.secret);
    } catch {
      user = null;
    }
  }

  return {
    user,
    userLoader,
    whisperLoader,
    response: res
  }
}
