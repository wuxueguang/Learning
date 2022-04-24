const { getOptions } = require('loader-utils');


module.exports = function(source, map, meta) {
  const options = getOptions(this);

  console.log(this.query);
  // 对资源应用一些转换……
  // console.log(options, source, map, meta);

  this.emitFile('test.txt', 'test');
  return source;
};



module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  console.log('--- pitch a ---');
  // return 'pitch return';
};