/**
 *   Анализ бандла:
 * - https://github.com/samccone/bundle-buddy
 * - https://github.com/danvk/source-map-explorer
 * - https://survivejs.com/webpack/optimizing/build-analysis/
 */

/* eslint-disable import/no-extraneous-dependencies */
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

const settings = require('./settings');

const path = require('path');

// eslint-disable-next-line no-unused-vars
module.exports = (env) => ({
  output: {
    filename: '[name].[chunkhash:8].bundle.js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    assetModuleFilename: '[hash][ext][query]',
  },
  devtool: 'source-map',
  optimization: {
    moduleIds: 'deterministic',
    minimizer: [`...`, new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].[chunkhash:8].bundle.js',
        },
      },
    },
  },
  plugins: [
    // https://github.com/webpack-contrib/compression-webpack-plugin#options
    new CompressionPlugin(),
    // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/151
    // https://github.com/webpack/webpack/issues/7300
    new RemoveEmptyScriptsPlugin({
      extensions: ['less', 'scss', 'css', 'css.js'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', settings.paths.static.base, 'offline.html'),
      filename: 'offline.html',
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, '..', 'swTemplate.js'),
      swDest: 'service-worker.js',
      exclude: [/\.map$/],
    }),
  ],
});
