
const fs = require('fs');
const path = require('path');
const send = require('send');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseCfg = require('./base');

module.exports = {
  ...baseCfg,

  mode: 'development',

  plugins: [
    ...baseCfg.plugins,
  ],

  devServer: {
    port: 80,
    compress: true,
    writeToDisk: true,
    disableHostCheck: true,
    contentBase: path.join(__dirname, '../dist'),
    contentBasePublicPath: baseCfg.output.publicPath,
    before: function(app, server) {
      // app.get(/^\/(?!(static\/.*|api\/.*))/, function(req, res){
      //   res.sendFile(path.join(__dirname, '../dist/entry.html'));
      // });

      app.get('*', function(req, res){
        res.sendFile(path.join(__dirname, '../dist/', req.originalUrl.replace(/\?.+/, '')));
      });
      // app.get(/(?<!\.)/, function(req, res){
      //   res.sendFile(path.join(__dirname, '../dist/entry.html'));
      // });
    }
  },
};
