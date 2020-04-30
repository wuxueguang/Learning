const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const static = require('koa-static');
const koaBody = require('koa-body');
const router = require('./server/router');

const app = new Koa();


app.use(views(path.resolve(__dirname, 'view'), {extension: 'ejs'}));

app.use(static(path.resolve(__dirname, 'public')));

app.use(koaBody({ multipart: true }));


app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8888);