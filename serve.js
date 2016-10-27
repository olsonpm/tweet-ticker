'use strict';

const http = require('http');

const reqListener = (req, res) => {
  return handleRequest(req, res);
};

const server = http.createServer(reqListener)
  .listen(8080);

const handleRequest = require('./release/index.pack').getRequestListener('', server, '/my.name-space');

console.log('listening on port 8080');
