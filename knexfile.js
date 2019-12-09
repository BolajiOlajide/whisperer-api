const config = require('lazy-config');


module.exports = {
  client: 'mysql2',
  pool: { min: 2, max: 10 },
  migrations: { tableName: 'knex_migrations' },
  seeds: { directory: './seeds' },
  connection: {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name
  },
  charset: 'utf8',
  debug: config.isDev
};
