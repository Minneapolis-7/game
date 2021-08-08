/**
 *   Анализ бандла:
 * - https://github.com/samccone/bundle-buddy
 * - https://github.com/danvk/source-map-explorer
 * - https://survivejs.com/webpack/optimizing/build-analysis/
 */

/* eslint-disable import/no-extraneous-dependencies */
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

// eslint-disable-next-line no-unused-vars
module.exports = (env) => ({
  output: {
    filename: '[name].[chunkhash:8].bundle.js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  devtool: 'source-map',
  optimization: {
    moduleIds: 'deterministic',
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  plugins: [
    // https://github.com/webpack-contrib/compression-webpack-plugin#options
    new CompressionPlugin(),
    new WebpackManifestPlugin(),
    // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/151
    // https://github.com/webpack/webpack/issues/7300
    new RemoveEmptyScriptsPlugin({
      extensions: ['less', 'scss', 'css', 'css.js'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
  ],
});
