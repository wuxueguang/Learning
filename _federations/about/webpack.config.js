/* eslint-disable no-undef */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    entry: './src/index',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:9002',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              // '@babel/plugin-transform-runtime',
              // '@babel/plugin-syntax-dynamic-import',
            ]
          }
        },
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'about',
      library: { type: 'var', name: 'about' },
      filename: 'remote_entry.js',
      exposes: {
        './About': './src/components/About',
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      chunks: ['runtime', 'entry'],
    })
  ],
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: 'runtime'
    }
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 9002,
  },
};