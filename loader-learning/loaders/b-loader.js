const { getOptions } = require('loader-utils');


module.exports = function(source, map, meta) {
  const options = getOptions(this);
  const callback = this.async();

  // 对资源应用一些转换……
  console.log(options, source, map, meta);

  setTimeout(() => {
    callback(null, 'source', 'map', 'meta');
  }, 6000);
};


module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  console.log('--- pitch b ---');
  // return 'pitch return';
};