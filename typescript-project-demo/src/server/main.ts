
import Koa from 'koa';
import Router from 'koa-router';
import send from 'koa-send';
import md5 from 'md5';

const app = new Koa();
const router = new Router();

console.log(md5('xingshulin token name'));
router
  .get(/static\/.*/, async (ctx: any, next: any) => {
    await send(ctx, ctx.path.replace('/static', 'dist'));
    next();
  })
  .get(/.*/, async (ctx: any, next: any) => {
    await send(ctx, 'index.html');
    next();
  });


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(7777);