'use strict';

module.exports = src => {
  return src.replace(
    "require.resolve('socket.io-client/socket.io.js')"
    , '"' + require.resolve('socket.io-client/socket.io.js') + '"'
  );
};
