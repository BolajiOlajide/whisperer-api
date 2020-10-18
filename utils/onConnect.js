const jwt = require('jsonwebtoken');
const config = require('lazy-config');

const userLoader = require('../dataloaders/user.loader');
const whisperLoader = require('../dataloaders/whisper.loader');


module.exports = (connectionParams, webSocket, context) => {
  const token = connectionParams['Authorization'] || '';
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
  }
};
