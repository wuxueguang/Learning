const parser = require('@babel/parser');

console.log(parser.parse("let name = 'Tom'; function f(){console.log(name)}"));