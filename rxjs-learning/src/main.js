import * as Rx from "rxjs";
import * as Os from "rxjs/operators";
import logger from '@zhizhu/color-log';
// import R from 'ramda';

// import { createStore } from '@zhizhu/utils/mobx';

// console.log(createStore)

/* import 'antd/dist/antd.less'; */  

// function* t(){}
// const a = async () => {}

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const Input = props => {
  return <input ref={props.myRef} />
};

const Test = () => {
  const ref = useRef();

  setInterval(() => {
    console.log(ref.current.value, '----');
  }, 1000);

  return (
    <div>
      <Input myRef={ref} />
    </div>
  )
};

render((
  <Test />
), document.getElementById('root'));

/*
const t$ = Rx
  .from(new Promise(resolve => {
    logger('-=-=-=-=-');
    resolve(111)
  }))
  .pipe(Os.map(v => {
    logger('pipe')
    return v;
  }))
  
t$.subscribe(v => logger(v))
t$.subscribe(v => logger(v))
*/


// Rx.Observable
//   .create(oberver => {
//     setInterval(() => {
//       oberver.next()
//     })
//   })

/*
Rx
  .interval(1000)
  .pipe(Os.takeWhile(v => v < 5))
  // .pipe(Os.map(() => {
  //   throw new Error;
  // }))
  .pipe(Os.tap(
    args => logger(args),
    err => logger(err),
    () => logger('completed'),
  ))
  .subscribe(v => logger(v, '==='))
*/


// Rx.of(1,2,3).pipe((...args) => {
//   logger(args);
//   return args[0];
// }).subscribe((...args) => {
//   logger(args);
// })



// const getOber = t => Rx.from(new Promise(resolve => {
//   setTimeout(() => {
//     resolve(t);
//   }, t);
// }));

// Rx
//   .from([getOber(1000), getOber(2000), getOber(3000), getOber(4000)])
//   .pipe(Os.mergeAll())
//   .subscribe(item => logger(item));

// Rx
//   .from(Promise.resolve({name: 'Jack'}))
//   .pipe(
//     arg => {
//       logger(arg)
//       return Os.pluck('name')(arg);
//     },
//     Os.tap(logger),
//     Os.catchError(err => {
//       logger(err, '=====');
//       return 'abc'
//     }),
//   )
//   .subscribe(v => logger(v, '-----'))

//   // logger(Os)

// Rx
//   .defer(() => Rx.from('333'))
//   .pipe()
//   .subscribe(data => logger(data))



// const foo = Rx.Observable.create(observer => {
//   logger('-=-==--=');
//   observer.next(1);
//   observer.next(2);
//   observer.complete();
//   observer.next(3);
//   observers.next(4);
//   // observer.error(err);
// });

// foo.subscribe({

//   next(value) { logger(value) ;},
  
//   complete() { logger('completed');},
  
//   error(err) { console.error(err); }
  
// });
// foo.subscribe(v => logger(v));
// var subject = new Rx.Subject();

// subject.subscribe({

//   next: (v) => logger('observerA: ' + v)

//   });

//   subject.subscribe({

//   next: (v) => logger('observerB: ' + v)

// });

// subject.next(1);

// subject.next(2);

// const height = document.getElementById('height');
// const height$ = Rx
//   .fromEvent(height, 'keyup')
//   .pipe(Os.pluck('target', 'value'));

// const width = document.getElementById('width');
// Rx
//   .fromEvent(width, 'keyup')
//   .pipe(
//     Os.pluck('target', 'value'),
//     Os.switchMap(w => height$.pipe(Os.map(h => w * h)))
//   ).subscribe(area => logger(area));

/* 
let left = 0;
let middle = 0;
let right = 0;

let counter = 0;

const btnLeft$ = Rx.fromEvent(document.getElementById('btn-left'), 'click')
  .pipe(Os.mapTo(`left ${++left}`));
const btnMiddle$ = Rx.fromEvent(document.getElementById('btn-middle'), 'click')
  .pipe(Os.map(() => `middle ${++middle}`));
const btnRight$ = Rx.fromEvent(document.getElementById('btn-right'), 'click')
  .pipe(Os.map(() => `right ${++right}`));


const p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve('left');
  }, 1000);
});
const p2 = new Promise(resolve => {
  setTimeout(() => {
    resolve('right');
  }, 500);
});
const p1$ = Rx.from(p1);
const p2$ = Rx.from(p2);


ajax().then(d1 => {
  return ajax(d1);
}).then(d2 => {
  console.log(d2);
});

ajax$().pipe(mergeMap(d1 => {
  return ajax$(d1);
})).subscribe(d2 => {
  console.log(d2);
});


p1.then(d1 => p2.then(d2 => [d1, d2])).then(data => console.log(data));

p1$.pipe(Os.mergeMap(p1 => p2$.pipe(Os.map(p2 => [p1, p2])))).subscribe(data => console.log(data));


p1$.pipe(Os.switchMap(p1 => p2$.pipe(Os.map(p2 => [p1, p2])))).subscribe(data => console.log(data));




let char = 'a';
let str = 'abcd';

function logByChar(str){
  str.split('').forEach(char => console.log(char));
}

logByChar(str);

console.log(char); */




// btnLeft$
//   .pipe(
//     Os.mergeMap(left => btnMiddle$.pipe(Os.map(mid => [left, mid])))
//   )
//   .subscribe(data => console.log(data))

// Rx
//   .zip(btnLeft$, btnMiddle$)
//   .subscribe(data => console.log(data));


// Rx.from(new Promise(resolve => {
//   setTimeout(() => {
//     resolve('1111111');
//   }, 1000);
// })).pipe(Os.switchMap(data => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve([data, '22222222']);
//     }, 1000);
//   })
// })).pipe(Os.switchMap(data => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve([...data, '3333333']);
//     }, 1000);
//   })
// })).subscribe(data => console.log(data))
// Rx
//   .concat(btnLeft$, btnMiddle$, btnRight$)
//   .subscribe(v => logger(v))

/*
const timer1 = Rx.interval(1000).pipe(
  Os.take(10),
  Os.map(v => `timer1 ${v}`),
);
const timer2 = Rx.interval(2000).pipe(
  Os.take(6),
  Os.map(v => `timer2 ${v}`),
);
const timer3 = Rx.interval(500).pipe(
  Os.take(10),
  Os.map(v => `timer3 ${v}`),
);
 
const result = Rx.concat(timer1, timer2, timer3);
result.subscribe(x => logger(x));
*/

// timer1.subscribe(v => logger(v))

// const p$ = Rx.from(new Promise(resolve => {
//   logger(++counter, '-------');
//   resolve(counter);
// }));
// Rx
//   .merge(btnLeft$, btnRight$)
//   .subscribe(v => logger(v))

// btnLeft$
//   // .pipe(Os.map(() => ++left))
//   .pipe(Os.mergeMap(() => btnRight$.pipe(
//     Os.map(() => [left, right])
//   )))
//   .subscribe( v => logger(v))


// p$
//   .pipe(
//     Os.retry(v => {
//       logger(v < 10);
//       return v < 10;
//     })
//   )
//   .subscribe(v => logger(v, '======='))

// Rx
//   .from([10, 20, 30])
//   .pipe(
//     Os.mergeMap(v => btn$.pipe(
//       Os.map(() => [++counter * v, counter]),
//     )),
//   )
//   .subscribe(v => logger(v));

// Rx
//   .from([10, 20, 30])
//   .pipe(
//     Os.switchMap(v => btn$.pipe(
//       Os.map(() => [++counter * v, counter]),
//     )),
//   )
//   .subscribe(v => logger(v));


// Rx.from([{name: 'John', age: 13}])
//   .subscribe(obj => logger(obj))


  // document.getElementById('btn').addEventListener('click', function(e){logger(this === e.currentTarget, this === e.target)})

// Rx
//   .zip(width$, height$, (w, h) => w * h)
//   .subscribe(area => logger('面积：', area));




// Rx
//   .of(1, 2, 3)
//   .pipe(
//     Os.switchMap(a => Rx.of(4, 5).pipe(Os.map(b => `${a} | ${b}`)))
//   )
//   .subscribe(v => logger(v))


  