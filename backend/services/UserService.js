const { User } = require('../models');

module.exports = {
  getAll: () => User.find(),
  create: (body) => new User(body).save(),
};