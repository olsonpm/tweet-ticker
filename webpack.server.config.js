'use strict';

const path = require('path');

module.exports = {
  target: 'node'
  , context: __dirname
  , entry: ['stream', './index.js']
  , output: {
    path: path.join(__dirname, 'release')
    , filename: 'index.pack.js'
    , pathinfo: true
    , libraryTarget: 'commonjs2'
  }
  , module: {
    loaders: [
      {
        test: /socket\.io\/lib\/index\.js$/
        , loader: path.join(__dirname, 'read-static-source-loader.js')
      },
      {
        test: /\.json$/
        , loader: 'json'
      }
    ]
  }
  , node: { __dirname: false }
};
