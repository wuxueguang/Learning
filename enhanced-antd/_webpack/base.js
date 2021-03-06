const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const entrys = require('./entry');

module.exports = {

  entry: {
    ...entrys,
    main: "./src/main",
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
        loader: "babel-loader",
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

};
