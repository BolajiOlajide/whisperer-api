const shortid = require('shortid');
const F = require('ng-faker');
const R = require('ramda');
const bcrypt = require('bcrypt');

const { USER_TABLE_NAME } = require('../utils/constants');


const encryptPassword = password => bcrypt
  .hashSync(password, bcrypt.genSaltSync(10));

const createUser = () => ({
  username: shortid.generate(),
  firstname: F.name.firstName(),
  lastname: F.name.lastName(),
  email: `${F.lorem.word()}_${F.random.number()}@gmail.com`,
  createdAt: new Date(),
  password: encryptPassword(F.lorem.word())
});

const users = R.times(createUser, 40)

exports.seed = knex => knex(USER_TABLE_NAME).del()
  .then(() => knex(USER_TABLE_NAME).insert(users))
  .catch((error) => logger.error(error));
