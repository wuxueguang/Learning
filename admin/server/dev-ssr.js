const nodemon = require('nodemon');

nodemon({
  script: './bin/server.js',
  watch: ['./server', './bin/server.js'],
  args: process.argv,
  env: { NODE_ENV: 'development' },
});
