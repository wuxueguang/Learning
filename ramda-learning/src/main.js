const R = require('ramda');
const log = console.log;

log(R.equals({name: 'Tom'})({name: 'Tom'}));