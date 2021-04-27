
const Koa = require('koa');
const Router = require('@koa/router');
const send = require('koa-send');
const proxy = require('koa-proxy');
const { kill } = require('cross-port-killer');
const path = require('path');
const webpack = require('webpack');
const koaWebpack = require('koa-webpack');

const config = require('../../webpack.config.js');
const apiPort = require('./port');

const app = new Koa;
const router = new Router;
const compiler = webpack(config);

// 硬盘中的 非内存中实时编译的静态资源
[
  '/static/vendor.js',
].forEach(path => {
  router.get(path, async (ctx, next) => {
    try{
      await send(ctx, ctx.request.url.replace('/static', ''), {
        root: `${__dirname}/../../dist`,
      });
    }catch(err){
      next();
    }
  });
});

koaWebpack({
  compiler,
}).then(middleware => {

  app.use(router.routes());

  app.use(middleware);   // muset be after router.routes

  app.use(proxy({
    host:  `http://127.0.0.1:${apiPort}`, // proxy alicdn.com...
    match: /^(?!\/static\/)/        // ...just the /static folder
  }));

  let staticPort = 3000;
  kill(staticPort).then(() => {
    app.listen(staticPort, () => {
      console.log(`应用已经启动，http://localhost:${staticPort}`);
    });
  });
});
  
const childPid = {
    pid: null,
    isAlive: true
};
const { fork } = require('child_process');
function startServerProcess() {
    let childProcess = fork(path.join(__dirname, '..'), ['server code change']);
    childPid.pid = childProcess.pid;
    childPid.isAlive = true;
}

startServerProcess();

const chokidar = require('chokidar');
chokidar.watch(path.join(__dirname, '..')).on('all', (event, path) => {
  if(childPid.isAlive) {
    process.kill(childPid.pid);
    childPid.isAlive = false;
    startServerProcess();
    console.log(event, path);
  }
});