
const Koa = require('koa');
const Router = require('koa-router');
const send = require('koa-send');

const app = new Koa();
const router = new Router();

router
  // .get(/static\/.*/, async (ctx, next) => {
  //   await send(ctx, ctx.path.replace('/static', 'dist'));
  //   next();
  // })
  // .get(/.*/, async (ctx, next) => {
  //   await send(ctx, 'index.html');
  //   next();
  // });
  .get('/loginStatus', ctx => {
    ctx.body = JSON.stringify({
      status: 1,
      message: 'success',
      data: {
        name: 'John',
        token: 'dsfsdfsdfsdsdfsdf',
      },
    });
  })
  .post('/login', ctx => {
    ctx.body = JSON.stringify({
      status: 1,
      message: 'success',
      data: {
        name: 'John',
        token: 'dsfsdfsdfsdsdfsdf',
      },
    });
  })
  .post('/logout', ctx => {
    ctx.body = JSON.stringify({
      status: 1,
      message: 'success',
    });
  })
  .get('/iframe.html', async ctx => {
    await send(ctx, 'iframe.html');
  });


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(7777);