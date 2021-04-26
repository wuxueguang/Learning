
// debugger

// 'use strict';


// function f(){

  
//   var a = '1';
  
//   // console.log(this);
// }

// var a = 1;
// b = 2;

// f();

const f = () => console.log(this);

f();
f.call({a: 'a'})
// console.log('outer output', a);
// document.getElementById('btn').addEventListener('click', () => {
//   console.log(this);
// })
// document.getElementById('btn').addEventListener('click', function(){
//   console.log(this);
// })

// global_lex

// f[[outetLex]]  
// function f() {   // outetLex = global_lex
//   // lex  { envRec }  
//   function f1(){
//     // lex
//     // lex[[envRec]]
//     // lex[[envRec]].hasThisBinding();
//     //envRec = lex[[envRec]];
//     // envRc[[ThisValue]]
//     // outer_lex
//     this;
//   }

//   f1();
// }
// f();


// const f = () => {   // outetLex = global_lex
//   // lex  { envRec }  
//   const f1 = () => {
//     // lex
//     // lex[[envRec]]
//     // lex[[envRec]].hasThisBinding();
//     // outer_lex
//     //envRec = lex[[envRec]];
//     // envRc[[ThisValue]]
//     // outer_lex
//     console.log(this);
//   }

//   f1();
// }
// f();











// var obj = {
//   say(){
//     console.log(this);
//   }
// };



// // binding

// const arrow = () => {
//   console.log(this, 'arrow');
// };

// function f(){}

// say()

// this
// f()
// obj.say()               
// f.call()
// f.apply()
// new f
// arrow()
// f.bind(obj)()
// const say = obj.say
// say()

// var a = 1
// this








// var a = {a: 'a'}


// function f(){
//   console.log(this);
// };

// const f1 = f.bind(a);
// const f2 = f1.bind({b: 'b'});

// f2();



// 'a'.toUpperCase;



// const say = obj.say;
// say();

// (obj.say)();



// arrow();

// function C(){
//   console.log(this);
// }

// new C;





// f.call(obj);
// f.apply(obj);

// const f1 = f.bind(obj);
// f1();

// const t = () => {
//   console.log(this);
// };

// t();


// function test(){
//   var a = 1;
//   debugger
// }
// test();


// const obj = {
//   say(){
//     var b = 2;
//     debugger
//     test();
//   }
// };
// obj.say();


// function tt(){
//   var a = 1;
//   function dd(){
//     var b = 2;
//     console.log(a)
//     debugger
//   }
//   dd();
// }
// tt();

// const tt = () => {
//   debugger
// };
// tt();

// let f0;

// const f1 = () => {
//   var a = 1;
//   f0 = () => {
//     console.log(a);
//   } 
// }

// f1();
// f0();
