
const proxy = require('koa-proxy');

const createProxyMiddleware = ({ headers, ...cfg }) => (ctx, next) => {
  ctx.req.headers = {
    ...ctx.req.headers,
    ...headers,
    cookie: ctx.req.headers.cookie,
  };

  return proxy(cfg)(ctx, next);
};

const createProxyReg = str => new RegExp(`^/proxied/${str}/`);
const proxyPath = path => `/proxied/${path}`;

// proxys
module.exports = [
  {
    host: 'http://localhost:3002',
    match: createProxyReg('3001'),
    map: path => path.replace(proxyPath(3001), '/api'),
  },
  {
    host: 'http://qa-bmapi.xsl.link',
    match: createProxyReg('bmapi'),
    map: path => path.replace(proxyPath('bmapi'), '/api/be'),
  },
].map(item => createProxyMiddleware(item));
