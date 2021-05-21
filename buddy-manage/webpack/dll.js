
const path = require('path');
const webpack = require('webpack');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseCfg = require('./base');

const { NODE_ENV } = process.env;

module.exports = {

  mode: NODE_ENV || 'development',

  entry: {
    vendor: require('../dll/vendor.dll.json'),
  },

  output: {
    filename: NODE_ENV === 'production' ? '[name].dll.[hash].js' : '[name].dll.js',
    path: path.join(__dirname, NODE_ENV === 'production' ? '../dist' : '../.temp'),
    publicPath: baseCfg.output.publicPath,
    // library必须和后面dllplugin中的name一致 后面会说明
    library: '[name]_dll_[hash]',
  },

  plugins: [

    new webpack.DllPlugin({
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      name: '[name]_dll_[hash]',
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.join(__dirname, '../.temp', '[name].manifest.json')
    }),

    new HtmlWebpackPlugin({
      title: '<%= htmlWebpackPlugin.options.title %>',
      filename: path.join(__dirname, NODE_ENV === 'production' ? '../.temp/entry.min.html' : '../.temp/entry.html'),
      template: './public/entry.html',
    }),
  ],

  performance: {
    maxEntrypointSize: 40000000,
    maxAssetSize: 10000000,
  },

};
