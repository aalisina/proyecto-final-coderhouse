const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  comparePasswords: (userPassword, reqPassword) => bcrypt.compareSync(reqPassword, userPassword),
  createToken: (user) => {
    const token = jwt.sign(
      {
        // eslint-disable-next-line no-underscore-dangle
        _id: user._id,
        first_name: user.first_name,
        email: user.email,
        orders: user.orders,
        admin: user.admin,
      },
      process.env.JWT_SECRET,
    );
    return token;
  },
};
