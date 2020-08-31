const Koa = require('koa');
import register from './middleware-register';

const PORT = 8080;
const app = new Koa();

register(app);

app.on('error', (err, ctx) => {
  console.log('error occured:', err.stack);
});

const server = require('http').createServer(app.callback());
server.listen(PORT, () => {
  const url = `http://127.0.0.1:${PORT}`;
  console.log('App start:')
  console.log(url);
});
