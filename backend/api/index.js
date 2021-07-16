/* eslint-disable no-console */
const express = require('express');

const api = express();
const PORT = process.env.PORT || 3001;
const http = require('http');

const server = http.createServer(api);
const { Server } = require('socket.io');

const io = new Server(server);

api.use(require('../routers'));

api.get('/', (req, res) => {
  res.send('Welcome.');
});

io.on('connection', (socket) => {
  console.log('a user is connected');
});

module.exports = { server, PORT };
