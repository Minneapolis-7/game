/* eslint-disable import/no-extraneous-dependencies */
require('core-js/stable');
require('regenerator-runtime/runtime');

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const WaitPlugin = require('./plugins/WaitPlugin');
const settings = require('./settings');

const path = require('path');

module.exports = ({ mode = 'production' } = {}) =>
  merge({
    name: 'server',
    mode,
    context: path.resolve(__dirname, '..', settings.paths.src.base, settings.paths.src.server),
    target: 'node',
    externalsPresets: { node: true },
    node: {
      __dirname: false,
    },
    entry: './server.ts',
    output: {
      path: path.resolve(__dirname, '..', settings.paths.dist.base),
      filename: 'server.js',
      library: {
        type: 'commonjs2',
      },
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        assets: path.resolve(
          __dirname,
          '..',
          settings.paths.static.base,
          settings.paths.static.assets
        ),
      },
      plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
    module: {
      rules: [
        {
          test: /\.ts|tsx$/,
          exclude: /(node_modules)/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.(css|scss)$/,
          use: 'null-loader',
        },
        // https://webpack.js.org/guides/asset-modules/
        {
          test: /\.(png|jpg|jpeg|gif|mp3)$/,
          type: 'asset/resource',
        },
        {
          test: /\.svg$/,
          use: [{ loader: 'svg-sprite-loader' }],
        },
        {
          test: /\.(json)$/,
          type: 'asset/source',
        },
      ],
    },
    plugins: [
      // ждать результата компиляции клиентской сборки (manifest.json)
      new WaitPlugin(
        path.resolve(
          __dirname,
          '..',
          settings.paths.dist.base,
          settings.paths.dist.static,
          'manifest.json'
        )
      ),
      new webpack.ProvidePlugin({
        window: path.resolve(__dirname, 'mocks/window'),
        localStorage: path.resolve(__dirname, 'mocks/localStorage'),
        document: 'global/document',
      }),
    ],
    devtool: 'source-map',
    performance: {
      hints: mode !== 'production' ? false : 'warning',
    },
    externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],
    optimization: { nodeEnv: false },
  });
