const path = require('path');
const Koa = require('koa');
const Router = require('@koa/router');
const send = require('koa-send');
const { kill } = require('cross-port-killer');

const router = new Router;
const app = new Koa;

router.get('/api/test', ctx => {
  console.log(ctx.headers)
  ctx.body = 'test';
});

app.use(router.routes());

const port = 3002;
kill(port).then(() => {
  app.listen(port, (err) => {
    console.log(`应用已经启动，http://localhost:${port}`);
    if(err){
      console.log(err);
    }
  });
});