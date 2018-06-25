import path from 'path'
import webpackNodeExternals from 'webpack-node-externals'

const projectDirectory = path.resolve(__dirname, '..')

export default {
  mode: 'development',
  target: 'node',
  context: projectDirectory,
  entry: path.resolve(projectDirectory, 'index.js'),
  externals: [webpackNodeExternals()],
  output: {
    libraryExport: 'default',
    path: path.resolve(projectDirectory, 'release'),
    filename: 'index.pack.js',
    pathinfo: true,
    libraryTarget: 'commonjs2',
  },
  node: { __dirname: true },
}
