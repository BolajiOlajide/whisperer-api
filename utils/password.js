const bcrypt = require('bcrypt');


exports.encryptPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

exports.comparePassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);
