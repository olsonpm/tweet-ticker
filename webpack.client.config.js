'use strict';

const path = require('path')
  , webpack = require('webpack')
  ;

module.exports = {
  context: path.join(__dirname, 'static/scripts')
  , devtool: 'cheap-source-map'
  , entry: './index.js'
  , output: {
    path: path.join(__dirname, 'release/static/scripts')
    , filename: 'index.pack.min.js'
  }
  , module: {
    loaders: [
      {
        test: /\.js$/
        , loader: 'babel'
        , query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.json$/
        , loader: 'json'
      }
    ]
  }
  , plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: true
      , mangle: true
      , sourceMap: true
    })
  ]
  , resolve: {
    alias: {
      TweenLite: path.join(__dirname, "./node_modules/gsap/src/uncompressed/TweenLite.js")
      , gsapCssPlugin: path.join(__dirname, "./node_modules/gsap/src/uncompressed/plugins/CSSPlugin.js")
      , "perfect-tooltip": path.join(__dirname, "./node_modules/perfect-tooltip/js/jquery.tooltip.js")
    }
  }
};
