const { Order } = require('../models');

module.exports = {
  getAllOrders: () => Order.find(),

};
