const Koa = require('koa');
const Router = require('@koa/router');
const send = require('koa-send');
const path = require('path');

const app = new Koa;
const router = new Router;

router.get(/^\/dist\//, async (ctx, next) => {
  await send(ctx, ctx.request.url);
});

router.get('/iframe.html', async (ctx, next) => {
  if(/^\/iframe.html$/.test(ctx.request.url) && ctx.request.header.referer){
    ctx.status = 302;
    ctx.redirect(`/iframe.html?domain=${escape(ctx.request.header.referer)}`);
  }else{
    await send(ctx, '/iframe.html');
  }
});

router.get(/.*/, async (ctx, next) => {
  await send(ctx, '/iframe.html');
});

app.use(router.routes());

app.listen(8000, () => {
  console.log(`应用已经启动，http://localhost:${8000}`);
});