const path = require('path');

module.exports = {

  entry: {
    main: ['./src/main'],
    // main2: ['./src/main2'],
  },

  output: {
    filename: '[name].[hash:6].js',
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
              modifyVars: {
                'primary-color': '#f90',
                'link-color': '#f90',
              },
              javascriptEnabled: true,
            },
          }
        }],
      },
      {
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
        exclude: [/\.html$/, /\.(js|jsx|ts|tsx)$/, /\.css$/, /\.json$/, /\.svg$/,],
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
