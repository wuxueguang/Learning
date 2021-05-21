

const typeOf = v => /^\[object (.*)\]$/.exec(Object.prototype.toString.call(v))[1].toLowerCase();

exports.isObject = obj => typeOf(obj) === 'object';

exports.isFunc = func => typeOf(func) === 'function';

exports.isArray = arr => typeOf(arr) === 'array';

exports.isPromise$ = Promise$ => p => p instanceof Promise$;

