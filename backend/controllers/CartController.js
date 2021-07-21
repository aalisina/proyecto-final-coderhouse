/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const { CartService } = require('../services');

module.exports = {
  getUserCart: async (req, res) => {
    const idUser = req.decoded._id;
    try {
      const cart = await CartService.getUserCart(idUser);
      if (!cart) {
        const newCart = await CartService.create();
        return res.status(200).json(newCart);
      }
      return res.status(200).json(cart);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  create: async (req, res) => {
    const { body } = req;
    const idUser = req.decoded._id;
    try {
      const newCart = await CartService.create(idUser, body);
      res.status(201).json(newCart);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  update: async (req, res) => {
    const { body } = req;
    const idUser = req.decoded._id;

    try {
      const cart = await CartService.getUserCart(idUser);
      if (!cart) res.status(404).json({ message: 'Cart not found.' });
      const modifiedCart = await CartService.update(cart, body);
      res.status(200).json(modifiedCart);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  delete: async (req, res) => {
    const idUser = req.decoded._id;
    try {
      const cart = await CartService.getUserCart(idUser);
      if (!cart) res.status(404).json({ message: 'Cart not found.' });
      await CartService.delete(idUser);
      res.status(204).json({});
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
