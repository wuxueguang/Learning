
const Koa = require('koa');
const Router = require('@koa/router');
const send = require('koa-send');
const path = require('path');

const app = new Koa;
const router = new Router;

router.get(/^\/dist\//, async (ctx, next) => {
  await send(ctx, ctx.request.url);
});

router.get(/.*/, async (ctx, next) => {
  console.log(ctx.request.url)
  await send(ctx, '/index.html');
});

app.use(router.routes());

app.listen(3000, () => {
  console.log(`应用已经启动，http://localhost:${3000}`);
});
