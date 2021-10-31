/* eslint-disable import/no-extraneous-dependencies */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// eslint-disable-next-line no-unused-vars
module.exports = (env) => ({
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
  ],
  devtool: 'eval-cheap-module-source-map',
});
