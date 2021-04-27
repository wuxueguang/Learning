
const send = require('koa-send');
const Router = require('@koa/router');
// const api = require('./api');
const router = new Router();

// api
['api'].forEach(path => {
  router.use(`/${path}`, require(`./${path}`).routes());
});


// static
router.get(/^\/static\/.+/, async (ctx, next) => {
  try{
    await send(ctx, ctx.request.url.replace('/static', ''), {
      root: `${__dirname}/../../dist`,
    });
  }catch(err){
    next();
  }
});

// entry
router.get(/^(?!\/(static|api|proxied)\/)/, async (ctx) => {
  await send(ctx, 'entry.html', {
    root: `${__dirname}/../../dist`,
  });
});

module.exports = router;
