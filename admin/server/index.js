import http from 'http';
import Koa from 'koa';
import chalk from 'chalk';
import Loadable from 'react-loadable';

import './prepare';
import register from './middleware-register';

const PORT = 6001;

const app = new Koa();

register(app);

app.on('error', (err, ctx) => {
  console.log('error occured:', err.stack);
});

const server = http.createServer(app.callback());

Loadable.preloadAll().then(() => {
  server.listen(PORT, () => {
    const url = `http://127.0.0.1:${PORT}`;
    console.log(`App start:  ${chalk.green(url)}`);
    console.log(chalk.grey('Ctrl/Command + C to close!'));
  });
});

