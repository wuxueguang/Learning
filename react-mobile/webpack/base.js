const path = require("path");
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const basicChunks = ['vendor', 'runtime'];
const pages = {
  'hero-story': {
    title: '英雄故事',
    chunks: [...basicChunks, 'hero-story'],
    script: './src/pages/hero-story',
  },
  'story-detail': {
    title: '故事详情',
    chunks: [...basicChunks, 'story-detail'],
    script: './src/pages/story-detail',
  },
  'hero-list': {
    title: '英雄榜',
    chunks: [...basicChunks, 'hero-list'],
    script: './src/pages/hero-list',
  },
  'victory-news': {
    title: '抗抑捷报',
    chunks: [...basicChunks, 'victory-news'],
    script: './src/pages/victory-news',
  },
};

const entry = {};
Object.entries(pages).forEach(([key, value]) => {
  entry[key] = value.script;
});


const { publicPath } = require('./_cfg');

module.exports = {
  entry,

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: publicPath,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
      {
        test: /\.css/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..'),
      manifest: require(path.join(__dirname, '../.temp/vendor.manifest.json')),
    }),

    ...Object.entries(pages).map(([key, value]) => new HtmlWebpackPlugin({
      title: value.title,
      filename: `${key}.html`,
      template: path.join(__dirname, '../.temp/index.html'),
      chunks: value.chunks,
    })),

  ],

  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      Mock: path.resolve(__dirname, '../src/_mock'),
      Services: path.resolve(__dirname, '../src/services'),
      Shared: path.resolve(__dirname, '../src/shared'),
      Utils: path.resolve(__dirname, '../src/utils'),
      Pages: path.resolve(__dirname, '../src/pages'),
      Components: path.resolve(__dirname, '../src/components'),
    },
  },

  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
  },

};
