
const Koa = require('koa');
const Router = require('koa-router');
const send = require('koa-send');

const app = new Koa();
const router = new Router();

router
  .get(/static\/.*/, async (ctx, next) => {
    ctx.response.set('Access-Control-Allow-Origin', '*');
    await send(ctx, ctx.path.replace('/static', 'dist'));
    next();
  })
  .get(/.*/, async (ctx, next) => {
    ctx.response.set('Access-Control-Allow-Origin', '*');
    await send(ctx, 'index.html');
    next();
  });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(7778);