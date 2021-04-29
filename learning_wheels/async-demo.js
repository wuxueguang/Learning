async function f1(){
    console.log(1);
}

async function f2(){
    console.log(2);
    setTimeout(() => {
        console.log('setTimeout')
    }, 0)
    await f1();
    console.log(3);
}

function f3(){
    new Promise((resolve) => {
        console.log(4);
        resolve();
    }).then(() => {
        console.log(5)
    })
}

f2();
f3();

{
    
    function fn(){
        'use strict';
        b = 1;
    }
    fn();
}