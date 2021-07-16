/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const api = express();
const PORT = process.env.PORT || 3001;
const http = require('http');

const server = http.createServer(api);
const { Server } = require('socket.io');

const io = new Server(server);

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(morgan('dev'));
api.use(cors({}));

api.use('/api/v1', require('../routers'));

api.get('/', (req, res) => {
  res.send('Welcome.');
});

io.on('connection', (socket) => {
  console.log('a user is connected');
});

module.exports = { server, PORT };
