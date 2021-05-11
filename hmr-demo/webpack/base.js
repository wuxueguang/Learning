const path = require('path');

module.exports = {

  entry: {
    main: ['./src/main'],
  },

  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/static/',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
        }],
      },
      {
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
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {
            // make loader to behave like url-loader, for all svg files
            encoding: 'base64',
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        exclude: [
          /\.html$/,
          /\.(js|jsx|ts|tsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/,
        ],
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },

  plugins: [],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.jsx'],
  },

  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
  },

};
