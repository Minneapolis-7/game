const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: {
    main: './server/server.ts',
  },
  output: {
    path: path.resolve(__dirname, '..', 'server-dist'),
    filename: 'index.js',
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
