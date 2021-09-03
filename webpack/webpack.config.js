require('core-js/stable');
require('regenerator-runtime/runtime');

const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const loadPresets = require('./loadPresets');
// eslint-disable-next-line import/no-dynamic-require, global-require
const getModeConfig = (mode) => require(`./webpack.${mode}.js`)(mode);
const settings = require('./settings');

const path = require('path');

const entries = {
  main: './index.tsx',
};

module.exports = ({ mode = 'production', presets = [] } = {}) =>
  merge(
    {
      mode,
      context: path.resolve(__dirname, '..', settings.paths.src.base),
      entry: entries,
      output: {
        path: path.resolve(__dirname, '..', settings.paths.dist.base, settings.paths.dist.static),
        publicPath: '/',
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
            test: /\.(png|jpg|jpeg|gif|mp3)$/,
            type: 'asset/resource',
          },
          {
            test: /\.svg$/,
            use: [{ loader: 'svg-sprite-loader' }],
          },
        ],
      },
      plugins: [
        new ForkTsCheckerWebpackPlugin({
          typescript: {
            configFile: path.resolve(__dirname, '..', 'tsconfig.json'),
          },
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, '..', settings.paths.src.base, 'index.html'),
          publicPath: '/',
        }),
        new GenerateSW(),
      ],
    },
    getModeConfig(mode),
    loadPresets({ mode, presets })
  );
