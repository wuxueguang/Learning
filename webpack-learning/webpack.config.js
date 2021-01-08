const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/main.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'MyLibrarys',
    libraryTarget: 'var',
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
  },
};
