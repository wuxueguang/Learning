
const fs = require('fs');
const path = require('path');
const send = require('send');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseCfg = require('./base');

module.exports = {
  ...baseCfg,

  mode: 'production',

  output: {
    ...baseCfg.output,
    filename: '[name].[hash].js',
  },

  plugins: [
    ...baseCfg.plugins,

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production', // use 'production' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
  ],

  optimization: {
    ...baseCfg.optimization,

    minimize: true,
  },

  performance: {
    maxEntrypointSize: 40000000,
    maxAssetSize: 10000000,
  },
};
