

class HelloWorldPlugin {
  apply(compiler){
    compiler.hooks.done.tap('Hello World Plugin', stats => {
      console.log('Hello World!');
    });
  }
}

module.exports = HelloWorldPlugin;

// console.log(process.cwd())


const reg = /2(?!1)\d/g;

let arr = reg.exec('22122');

while(arr){
  console.log(arr[0]);
  arr = reg.exec('22122');
}