const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    'main': './src/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [/* ¿ */],
      },
      // {
      //   test: /\.css$/,
      //   use: [{
      //     options: {test: 'test'},
      //     loader: path.resolve(__dirname, './loaders/file-loader.js'),
      //   }],
      // },
      {
        test: /\.jpg$/,
        use: [{
          loader: path.resolve(__dirname, './loaders/a-loader.js?a=1&b=2'),
        }, {
          options: {test: 'test'},
          loader: 'file-loader',
        }],
      }
    ]
  },
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
    port: 9000,
  },
};