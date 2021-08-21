const path = require('path');
const settings = require('./settings');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: {
    main: './server/server.ts',
  },
  output: {
    path: path.resolve(__dirname, '..', settings.paths.dist.base),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: ['babel-loader'],
      },
    ],
  },
};
