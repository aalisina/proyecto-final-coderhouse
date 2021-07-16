/* eslint-disable no-console */
const { server, PORT } = require('./api');

server.listen(PORT, ()=> {
  console.log(`Server listening on port: ${PORT}`);
})