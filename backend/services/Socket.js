const io = require('../api');

io.on('connection', (socket) => {
  console.log('a user is connected');
});
