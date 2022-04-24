const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

  entry: {
    main: "./src/index",
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/static/",
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
    extensions: [".js", ".jsx"],
  },

  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
  },

  externals: {
    React: 'react',
  },
};
