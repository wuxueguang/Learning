const webpack = require('webpack');
const config = require('./webpack.config.js');
const middleware = require('webpack-dev-middleware');
const devServer = require('webpack-dev-server');
const compiler = webpack(config);
const express = require('express');
const app = express();

app.use(
  middleware(compiler, {
    // webpack-dev-middleware options
  })
);

app.listen(3000, () => console.log('Example app listening on port 3000!'));