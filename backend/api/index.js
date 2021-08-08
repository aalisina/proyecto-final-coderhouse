/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { errors } = require('celebrate');
const path = require('path');
const jwt = require('jsonwebtoken');

const api = express();
const PORT = process.env.PORT || 3001;
const http = require('http');

const server = http.createServer(api);
const { Server } = require('socket.io');
// const { userSocketQuery } = require('../utils');
const {
  ProductsService, UserService, OrderService, CartService,
} = require('../services');

const io = new Server(server);

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(morgan('dev'));
api.use(cors({}));
api.use(errors());

api.use('/api', require('../routers'));

api.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

io.on('connection', (socket) => {
  console.log(`User ${socket.id} is connected.`);
  // console.log(socket.id);
  socket.broadcast.emit('mensaje', 'From the server.');
  socket.on('new-message', (payload) => {
    console.log(payload);
    const { token } = payload;

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        socket.emit('resp-message', { token: undefined, message: 'Invalid token.' });
      } else {
        try {
          const user = await UserService.getOneByEmail(decoded.email);
          if (!user) socket.emit('resp-message', { token: undefined, message: 'User not found.' });
          if (payload.message.toLowerCase() === 'stock') {
            const products = await ProductsService.getAll();
            const stocks = products.map((prod) => ({
              name: prod.product_name,
              stock: prod.stock,
            }));
            console.log(stocks);
            return socket.emit('resp-message', { token: decoded, message: stocks });
          }
          if (payload.message.toLowerCase() === 'orden') {
            const allOrders = await OrderService.getAllOrders();
            const userOrders = allOrders.filter(
              (order) => order.user_id.toString() === decoded._id.toString(),
            );
            if (!userOrders) socket.emit('resp-message', { token: decoded, message: 'User has no orders.' });
            return socket.emit('resp-message', { token: decoded, message: userOrders });
          }
          if (payload.message.toLowerCase() === 'carrito') {
            const carts = await CartService.getAllCarts();
            if (!carts) socket.emit('resp-message', { token: decoded, message: 'No carts available.' });
            const cart = carts.filter((e) => (e.user_id.toString() === decoded._id));
            if (!cart) socket.emit('resp-message', { token: decoded, message: 'The user has no cart.' });
            return socket.emit('resp-message', { token: decoded, message: cart });
          }
          const texto = `Hola! No he podido comprender tu mensaje. Por favor ingresa una de las seguientes opciones => 
            1: Stock
            2: Orden 
            3:Carrito`;
          socket.emit('resp-message', { token: decoded, message: texto });
        } catch (error) {
          console.log(error);
        }
      }
    });
  });
});

module.exports = { server, PORT, io };
