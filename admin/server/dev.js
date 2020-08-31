console.log('waiting for webpack -------');
const webpack = require('webpack');
// const devMiddleware = require('koa-webpack-middleware').devMiddleware;
// const hotMiddleware = require('koa-webpack-middleware').hotMiddleware;
const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
// const chokidar = require('chokidar');

// const webpackConfig = require('../webpack.config');

const webpackConfig = getWebpackConfig(argv);
const app = new Koa();
const port = 8007;
const compiler = webpack(webpackConfig);

// app.use(serve(__dirname, '../vendor'));

// argv.env = 'dev';

// const devMiddlewareInstance = devMiddleware(compiler, {
//   noInfo: true,
//   watchOptions: {
//     aggregateTimeout: 300,
//     poll: true
//   },
//   publicPath: '/build/',
//   stats: {
//     colors: true
//   },
//   quiet: true,
//   hot: true,
// });
// const hotMiddlewareInstance = hotMiddleware(compiler, {
//   log: console.log,
//   path: '/__webpack_hmr',
//   heartbeat: 10 * 1000,
// });

const register = require('./middleware-register');

app.env = 'development';

// app.use(devMiddlewareInstance);
// app.use(hotMiddlewareInstance);
register(app);

app.on('error', (err, ctx) => {
  console.log('error occured:', err.stack);
});

// listen
const server = require('http').createServer(app.callback());

// const watcher = chokidar.watch([
//   path.join(__dirname, '../app'),
// ]);

// watcher.on('ready', () => {
//   watcher.on('all', (e, p) => {
//     console.log('Clearing module cache');
//     Object.keys(require.cache).forEach((id) => {
//       if (/(I18n|oauth-util)/.test(id)) return;
//       if (/[\/\\](app)[\/\\]/.test(id)) delete require.cache[id];
//     });
//   });
// });

let isListened = false;

let isListened = false;

compiler._plugins['after-compile'].push((compilation, callback) => {
  callback();
  !isListened && server.listen(port, () => {
    console.log('App started, at port %d, CTRL + C to terminate', port);
    isListened = true;
  });
});
