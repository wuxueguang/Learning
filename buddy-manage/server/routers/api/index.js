const axios = require('axios');
const Router = require('@koa/router');
const router = new Router();

const cfg = require('../../cofig');

/* router.get('/login', async ctx => {
  ctx.body = 'logined';
}); */

router.post('/auth-api/login', async (ctx) => {
  const { username, password } = ctx.request.body;
  const result = await axios.post(`${cfg.acmDomain}/authenticate/login`, { username, password });
  const { expireTime, token } = result.data;
  const expires = new Date(expireTime * 1000);

  ctx.cookies.set('L-User-Token', token, {
    expires,
    domain: process.env.NODE_ENV !== 'production' ? 'localhost' : '.xingshulin.com',
  });

  ctx.body = { result: 'SUCCESS' };
});

module.exports = router;
