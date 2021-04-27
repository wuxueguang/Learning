
const Router = require('@koa/router');
const proxy = require('koa-proxy');

const proxyMap = require('./proxies');

const router = new Router;

const createProxyMiddleware = ({ headers, ...cfg }) => (ctx, next) => {
	ctx.req.headers = {
		...ctx.req.headers,
		...headers,
		cookie: ctx.req.headers.cookie,
	};

	return proxy(cfg)(ctx, next);
};

for(const [path, cfg] of proxyMap){
	router[cfg.method || 'get'](path, createProxyMiddleware(cfg));
}

module.exports = router.routes();
