/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const mongoose = require('mongoose');
const { CartService, ProductsService } = require('../services');
const { Cart } = require('../models');

module.exports = {
  getUserCart: async (req, res) => {
    const idUser = req.decoded._id;
    try {
      const carts = await CartService.getAllCarts();
      if (!carts) res.status(400).json({ message: 'Carts not found.' });
      const cart = carts.filter((e) => (e.user_id.toString() === idUser));
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getAllCarts: async (req, res) => {
    try {
      const carts = await CartService.getAllCarts();
      if (!carts) res.status(400).json({ message: 'Carts not found.' });
      res.status(200).json(carts);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  addProductToCart: async (req, res) => {
    const { body } = req;
    const idUser = req.decoded._id;
    try {
      const carts = await CartService.getAllCarts();
      if (!carts) res.status(400).json({ message: 'Carts not found.' });
      const cart = carts.filter((e) => (e.user_id.toString() === idUser))[0];
      if (!cart) res.status(400).json({ message: 'Cart not found.' });
      const products = await ProductsService.getAll();
      const product = products.filter((e) => e._id.toString() === body.product_id)[0];
      if (!product) res.status(400).json({ message: 'Product not found.' });

      if (product.stock < body.quantity || product.stock <= 0) return res.status(400).json({ message: 'Out of stock.' });
      const stock = (product.stock - body.quantity);
      await ProductsService.updateQuantity(product._id, stock);
      // no funciona
      // cart.products.push(body).save();

      // probar con otra instancia del carrito
      const anotherCart = await Cart.findById(cart._id);
      anotherCart.products.push(body);
      const updatedCart = await Cart.findByIdAndUpdate(cart._id, anotherCart)

      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deleteProductFromCart: async (req, res) => {
    const idUser = req.decoded._id;
    try {
      const carts = await CartService.getAllCarts();
      if (!carts) res.status(400).json({ message: 'Carts not found.' });
      const cart = carts.filter((e) => (e.user_id.toString() === idUser));
      if (!cart) res.status(400).json({ message: 'Cart not found.' });
      await CartService.delete(cart._id);
      res.status(204).json({});
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
