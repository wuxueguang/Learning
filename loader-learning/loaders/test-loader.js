const { getOptions } = require('loader-utils');


module.exports = function(source) {
  const options = getOptions(this);

  // 对资源应用一些转换……
  console.log(options, '----', source);

  return source;
};