// global.a = 'outer a';

// function fn(){
//   return Function('123123', 'console.log(arguments[0]);');
// }
// fn()();

// function fnn(){
//   const a = 'inner a';
//   return function(){
//     console.log(a);
//   };
// }
// fnn()();

// eval('var a = 1;');
// var expression = new String("2 + 2");
// console.log(eval(String(expression)));


// const f1 = new Function('console.log(this);');
// const f2 = new Function('"use strict"; console.log(this);');

// f1();
// f2();



// document.getElementById('test_btn').addEventListener('click', function(){

//   const n = Math.random() * 10;

//   console.log(111111);
//   console.log(111111);
//   console.log(111111);
// });

// document.getElementById('test_btn').addEventListener('click', function(){
//   console.log(222222);
//   console.log(222222);
//   console.log(222222);
// });


document.body.addEventListener('click', function(e){
  console.log(e.target);

  if(e.target.tagName === 'BUTTON'){
    var dots = ['.', '..', '...', ''];
    var i = 0;
    var btnText = e.target.textContent;

    e.target.classList.remove('test');
    var si = setInterval(function(){
      e.target.textContent = btnText + dots[i++ % 4];
    }, 500);

    setTimeout(function(){
      e.target.classList.add('test');
    }, 3000);
  }

  
});



