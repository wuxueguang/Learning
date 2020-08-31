const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ApiMockPlugin = require("mocker-api");
const webpack = require("webpack");

const isDev = process.argv.indexOf("--development") >= 0 ? true : false;
const enableMock = process.argv.indexOf("--nomock") >= 0 ? false : isDev;
process.env.NODE_ENV = isDev ? "development" : "production";

const extractStyle = new ExtractTextPlugin({
  filename: "styles.[hash].min.css",
  disable: isDev,
});

const publicPath = isDev ? '/' : 'https://assets.veervr.tv/@veervr/venom/';

let Plugins = [

  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: ['dist']
  }),
  new CopyPlugin([{
    from: "static"
  }]),
  new webpack.DefinePlugin({
    __DEV__: isDev,
    __ENABLEMOCK__: enableMock
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: './static/index.html'
  })
]
if (!isDev) {
  Plugins.unshift(extractStyle)
}
module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.tsx",
  output: {
    filename: "[hash].bundle.js",
    chunkFilename: '[hash].chunk.js',
    path: __dirname + "/dist",
    publicPath: publicPath,
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: isDev ? "source-map" : undefined,

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },

  module: {
    rules: [
      // css / scss
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // },
      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: [{
      //       loader: "css-loader"
      //     }, {
      //       loader: "px2rem-loader",
      //       options: {
      //         remUnit: 100
      //       }
      //     }, {
      //       loader: 'postcss-loader'
      //     }, {
      //       loader: "sass-loader"
      //     }, ]
      //   })
      // },
      {
        test: /\.(scss|css)$/,
        use: isDev ? [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ] : extractStyle.extract([
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ]),
        exclude: /node_modules/,
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  plugins: Plugins,
  optimization: {
    minimize: !isDev,
  },
  devServer: {
    publicPath: '/',
    hot: true,
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: {
      index: '/'
    },
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    allowedHosts: ["*"],
    port: 8080,
    before(app, server) {
      if (enableMock) {
        console.log(enableMock, 'enableMock')
        ApiMockPlugin(app, path.resolve(__dirname, './mock/index.js'), {
          changeHost: true
        })
      } else {

      }
    }
  }
};