/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const { OrderService } = require('../services');

module.exports = {
  getAllUserOrders: async (req, res) => {
    const idUser = req.decoded._id;
    try {
      const allOrders = await OrderService.getAllOrders();
      // eslint-disable-next-line max-len
      const userOrders = allOrders.filter((order) => order.user_id.toString() === idUser.toString());
      if (!userOrders) res.status(400).json({ message: 'User has no orders.' });
      res.status(200).json(userOrders);
    } catch (error) {
      res.status(400).json(error);
    }
  },

};
