
const Router = require('koa-router');
const md5 = require('md5');

const { TOKEN_NAME } = require('../consts');

const router = new Router();

router.post('login', (ctx: Object) => {
  // const token = ctx.cookies.get(md5(TOKEN_NAME));
  // if()

  // const { name, password } = ctx.req.
});