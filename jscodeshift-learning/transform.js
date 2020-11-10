module.exports = function(fileInfo, api, options) {
  const obj = api.jscodeshift(fileInfo.source);
  for(let n in obj){
    console.log(n);
  }
  return obj
    .findVariableDeclarators('bar')
    .renameTo('foo')
    .toSource();
};
