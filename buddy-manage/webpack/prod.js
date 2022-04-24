
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseCfg = require('./base');

module.exports = {
  ...baseCfg,

  mode: process.env.NODE_ENV || 'production',

  output: {
    ...baseCfg.output,
    filename: '[name].[hash].js',
  },

  plugins: [

    new CleanWebpackPlugin(),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production', // use 'production' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),

    new HtmlWebpackPlugin({
      title: 'HMR demo',
      filename: 'entry.html',
      template: './public/entry.html',
    }),
  ],

  optimization: {
    ...baseCfg.optimization,

    minimize: true,

    splitChunks: {

      automaticNameDelimiter: '_',   // default ~

      cacheGroups: {
        vendor: {
          name: 'vendor',
          // minSize: 6000,     // bundle的最小size  单位：byte
          // maxSize: 10000,    // bundle的最大size，单位：byte， 超过就拆分成小的bundle
          // filename: '[name].budle.js',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10 // 优先级
        },
        common: {
          name: 'common',
          test: /[\\/]src[\\/]/,
          minSize: 1024,
          chunks: 'all',
          priority: 5
        },
        styles: {
          name: 'styles',
          test: /\.(?:less|css)$/,
          chunks: 'all',
          enforce: true,
        },
      },

    },

  },

  performance: {
    maxEntrypointSize: 40000000,
    maxAssetSize: 10000000,
  },
};
