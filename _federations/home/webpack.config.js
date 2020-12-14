/* eslint-disable no-undef */


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    'main': './src/main'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:9001',
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
              '@babel/plugin-transform-runtime',
              '@babel/plugin-syntax-dynamic-import',
            ]
          }
        },
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'home',
      // library: { type: 'var', name: 'home' },
      // exposes: {
      //   Container: './src/components/Container'
      // },
      // remotes: {
      //   about: 'about',
      // },
      // shared: ['rxjs'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      chunks: ['runtime', 'main'],
    })
  ],
  optimization: {
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
    port: 9001,
  },
};