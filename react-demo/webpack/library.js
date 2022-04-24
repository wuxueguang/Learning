const path = require('path');
const baseCfg = require('./base');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    'library': './src/index.js',
  },
  output: {
    filename: '[name].js',
    library: 'tools',
    libraryExport: 'default',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../dist'),
  },
  module: baseCfg.module,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'styled-components': 'styled-components',
    'prop-types': 'prop-types',
  },
};
