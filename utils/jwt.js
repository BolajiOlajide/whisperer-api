const jwt = require('jsonwebtoken');
const config = require('lazy-config');

const { secret, audience, algo } = config.authentication;
const expiresIn = '100d'; // 100days token because i am not bothered
const jwtConfig = {
  expiresIn,
  algorithm: algo,
  audience
};


exports.createJwt = id => jwt.sign({ id }, secret, jwtConfig);
