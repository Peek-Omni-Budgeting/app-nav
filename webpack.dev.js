const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const { merge } = require('webpack-merge');

const common = require('./webpack.common');

const targetPort = argv['port'] || 3000;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',

  optimization: {
    minimize: false,
  },

  cache: true,

  output: {
    publicPath: `http://localhost:${targetPort}/`,
  },

  devServer: {
    static: path.join(__dirname, 'public'),
    port: targetPort,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Content-Type, Authorization',
    }
  }
});