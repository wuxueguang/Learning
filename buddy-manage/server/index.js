// const path = require('path');
const Koa = require('koa');
const { kill } = require('cross-port-killer');

const router = require('./routers');
const proxies = require('./proxy');

const serverPort = require('../script/dev/port');

const app = new Koa();

proxies.forEach(proxy => app.use(proxy));
app.use(router.routes());

console.log('server start');

const isDev = process.argv[2] === 'server code change';
const port = isDev ? serverPort : process.env.SERVER_PORT || 80;
kill(port).then(() => {
  app.listen(port, (err) => {
    isDev || console.log(`应用已经启动，http://localhost:${port}`);
    if(err){
      console.log(err);
    }
  });
});
