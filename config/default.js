require('dotenv').config();
const { getEnvVar } = require('env-utils');


const lazyGetEnvVar = (...args) => () => getEnvVar(...args);


module.exports = {
  isDev: () => process.env.NODE_ENV === 'development',
  isStaging: () => process.env.NODE_ENV === 'staging',
  isProd: () => process.env.NODE_ENV === 'production',

  app: {
    port: lazyGetEnvVar('PORT', { devDefault: '8100', optional: true }),
    graphqlpath: '/graphql',
    subscriptionsPath: '/subscriptions'
  },

  authentication: {
    secret: lazyGetEnvVar('JWT_SECRET', { devDefault: 'bolaji' }),
    audience: lazyGetEnvVar('JWT_AUDIENCE', { devDefault: 'whisperer' }),
    algo: lazyGetEnvVar('JWT_ALGO', { devDefault: 'HS512' }),
  },

  db: {
    host: lazyGetEnvVar('DATABASE_HOST', { devDefault: '127.0.0.1' }),
    name: lazyGetEnvVar('DATABASE_NAME'),
    password: lazyGetEnvVar('DATABASE_PASSWORD'),
    user: lazyGetEnvVar('DATABASE_USERNAME'),
  }
};
