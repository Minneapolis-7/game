require('core-js/stable');
require('regenerator-runtime/runtime');

const path = require('path');
const { merge, mergeWithCustomize, customizeArray } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const loadPresets = require('./build-utils/loadPresets');
// eslint-disable-next-line import/no-dynamic-require, global-require
const modeConfig = (mode) => require(`./build-utils/webpack.${mode}.js`)(mode);
const settings = require('./build-utils/settings');

const entries = {
  main: './index.tsx',
};

module.exports = ({ mode = 'production', presets = [] } = {}) =>
  merge(
    {
      mode,
      context: path.resolve(__dirname, settings.paths.src.base),
      entry: entries,
      output: {
        path: path.resolve(__dirname, settings.paths.dist.base),
        publicPath: '/',
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
          assets: path.resolve(__dirname, settings.paths.www.base, settings.paths.www.assets),
        },
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
            use: [
              {
                loader: mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: mode === 'production',
                  importLoaders: 2,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: mode === 'production',
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sassOptions: {
                    outputStyle: 'expanded',
                  },
                },
              },
            ],
          },
          // https://webpack.js.org/guides/asset-modules/
          {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            type: 'asset/resource',
          },
        ],
      },
      plugins: [
        new ForkTsCheckerWebpackPlugin({
          typescript: {
            configFile: path.resolve(__dirname, 'tsconfig.json'),
          },
        }),
        new HtmlWebpackPlugin({
          template: '../www/index.html',
          publicPath: '/',
        }),
      ],
    },
    mergeWithCustomize({
      customizeArray: customizeArray({
        'module.rules': 'replace',
      }),
    })(modeConfig(mode), loadPresets({ mode, presets }))
  );
