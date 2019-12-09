const jwt = require('jsonwebtoken');
const config = require('lazy-config');


module.exports = ({ req }) => {
  const token = req.headers.authorization || '';
  let user;

  try {
    user = jwt.verify(token, config.authentication.secret);
  } catch {
    user = null;
  }
  return { user }
}
