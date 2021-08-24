/* eslint-disable import/no-extraneous-dependencies */
const settings = require('./settings');

const path = require('path');

// eslint-disable-next-line no-unused-vars
module.exports = (env) => ({
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
  },
  plugins: [],
  devtool: 'eval-cheap-module-source-map',
  // https://webpack.js.org/configuration/dev-server/
  // https://survivejs.com/webpack/developing/webpack-dev-server/
  // https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md
  devServer: {
    static: {
      directory: path.resolve(settings.paths.static.base),
      watch: true,
    },
    hot: true,
    devMiddleware: {
      stats: 'errors-only',
    },
    client: {
      logging: 'error',
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    historyApiFallback: true,
    host: process.env.DEVSERVER_HOST || '0.0.0.0',
    port: process.env.DEVSERVER_PORT || 3000,
  },
});
