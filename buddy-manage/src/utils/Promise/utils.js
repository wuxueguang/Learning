
const { IS_PROMISE } = require('./consts');

const typeOf = v => /^\[object (.*)\]$/.exec(Object.prototype.toString.call(v))[1].toLowerCase();

const isObject = obj => typeOf(obj) === 'object';

const isFunc = func => typeOf(func) === 'function';

const isArray = arr => typeOf(arr) === 'array';

const isPromise$ = p => isObject(p) && p[IS_PROMISE];

const thenable = obj => isObject(obj) && isFunc(obj['then']);

module.exports = { typeOf, isObject, isFunc, isArray, isPromise$, thenable };
