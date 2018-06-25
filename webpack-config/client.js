//---------//
// Imports //
//---------//

import path from 'path'
import TerserPlugin from 'terser-webpack-plugin'

//
//------//
// Init //
//------//

const isDevelopment = process.env.NODE_ENV === 'development',
  projectDirectory = path.resolve(__dirname, '..')

//
//------//
// Main //
//------//

const config = {
  mode: isDevelopment ? 'development' : 'production',
  context: projectDirectory,
  devtool: isDevelopment ? 'cheap-module-eval-source-map' : 'source-map',
  entry: path.resolve(projectDirectory, 'static/scripts/index.js'),
  output: {
    path: path.resolve(projectDirectory, 'release/static/scripts'),
    filename: 'index.pack.min.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /\/node_modules\//,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                targets: {
                  browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
                },
              },
            ],
          ],
        },
      },
    ],
  },
  optimization: {
    minimize: !isDevelopment,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  resolve: {
    alias: {
      TweenLite: path.resolve(
        projectDirectory,
        'node_modules/gsap/src/uncompressed/TweenLite.js'
      ),
      gsapCssPlugin: path.resolve(
        projectDirectory,
        'node_modules/gsap/src/uncompressed/plugins/CSSPlugin.js'
      ),
      'perfect-tooltip': path.resolve(
        projectDirectory,
        'node_modules/perfect-tooltip/js/jquery.tooltip.js'
      ),
    },
  },
}

//
//---------//
// Exports //
//---------//

export default config
