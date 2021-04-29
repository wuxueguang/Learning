
exports.isFunc = func => typeof func === 'function';

exports.isPromise$ = Promise$ => p => p instanceof Promise$;