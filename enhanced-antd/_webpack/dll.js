
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseCfg = require('./base');
const base = require('./base');

module.exports = {
  mode: 'production',

  entry: {
    vendor: require('../dll/vendor.dll.json'),
  },

  output: {
    filename: '[name].dll.[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: baseCfg.output.publicPath,
    // library必须和后面dllplugin中的name一致 后面会说明
    library: '[name]_dll_[hash]',
  },

  plugins: [
    new CleanWebpackPlugin(),

    new webpack.DllPlugin({
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      name: '[name]_dll_[hash]',
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.join(__dirname, '../.temp', '[name].manifest.json')
    }),

    new HtmlWebpackPlugin({
      filename: path.join(__dirname, '../.temp/index.html'),
      template: './public/index.html',
    }),
  ],

  performance: {
    maxEntrypointSize: 40000000,
    maxAssetSize: 10000000,
  },

};
