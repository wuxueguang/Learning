/* eslint-disable no-undef */

const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    Dashboard: './src/main.js'
  },
  output: {
    filename: '[name].js',
    library: 'Dashboard',
    libraryExport: 'default',
    path: path.resolve(__dirname, '../mmcp/src/client/components/'),
    globalObject: 'this',
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {}
      }],
    }, {
      test: /\.tsx?$/,
      loader: [ 'ts-loader'],
      exclude: /(node_modules|bower_components)/,
    }, {
      test: /\.jsx?$/,
      loader: [ 'babel-loader'],
      exclude: /(node_modules|bower_components)/,
    }, {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader'],
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
        },
      }, {
        loader: 'sass-loader',
      }],
    }, {
      test: /\.less$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
      }, {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        }
      }],
    }]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   title: '杏树林综合后台',
    //   filename: 'index.html',
    //   chunks: ['runtime', 'main'],
    //   template: path.resolve(__dirname, '../src/client/index.html'),
    // }),
    // new HtmlWebpackPlugin({
    //   title: '杏树林综合后台',
    //   filename: 'iframe.html',
    //   chunks: ['runtime', 'iframe'],
    //   template: path.resolve(__dirname, '../src/client/iframe.html'),
    // }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  externals: [
    {
      react: 'React',
      'prop-types': 'PropTypes',
      'react-dom': 'ReactDOM',
      antd: 'antd',
      moment: 'moment',
      mobx: 'mobx',
    },
  ],
};