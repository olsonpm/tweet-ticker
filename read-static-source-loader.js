'use strict';

const fs = require('fs')
  , read = fs.readFileSync
  ;

const stringSrc = '`'
  + read('/home/phil/git-repos/personal/tweet-ticker/node_modules/socket.io-client/socket.io.js', 'utf-8')
  .replace(/([^\\])\`/g, "$1\\`")
  .replace(/([^\\])\\u\\/g, "$1\\\\u\\")
  .replace(/\r\n/g, '\n')
  + '`';

module.exports = src => {
  return src.replace(
    "read(require.resolve('socket.io-client/socket.io.js'), 'utf-8')"
    , () => stringSrc
  );
};
