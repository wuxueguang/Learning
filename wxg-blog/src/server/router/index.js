const router = require('koa-router')();
const uploader = require('./uploader');


router
    .get('/test', async ctx => {
        await ctx.render('test', {title: '测试ejs'});
    })
    .get('/upload', async ctx => {
        await ctx.render('upload');
    }).put('/upload', uploader);

module.exports = router;