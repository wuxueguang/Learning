import * as Rx from "rxjs";
import * as Os from "rxjs/operators";

const { Observable } = Rx;
 
const foo = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
  setTimeout(() => {
    subscriber.next(423);
    subscriber.error(new Error('error'))
  }, 3000);
});
 
foo.pipe(Os.catchError(e => Rx.of([1]))).subscribe({
  next: x => console.log(x),
  error: error => console.log(error)
});
foo.subscribe(y => {
  console.log(y);
});

/*
const t$ = Rx
  .from(new Promise(resolve => {
    console.log('-=-=-=-=-');
    resolve(111)
  }))
  .pipe(Os.map(v => {
    console.log('pipe')
    return v;
  }))
  
t$.subscribe(v => console.log(v))
t$.subscribe(v => console.log(v))
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
    args => console.log(args),
    err => console.log(err),
    () => console.log('completed'),
  ))
  .subscribe(v => console.log(v, '==='))
*/


// Rx.of(1,2,3).pipe((...args) => {
//   console.log(args);
//   return args[0];
// }).subscribe((...args) => {
//   console.log(args);
// })



// const getOber = t => Rx.from(new Promise(resolve => {
//   setTimeout(() => {
//     resolve(t);
//   }, t);
// }));

// Rx
//   .from([getOber(1000), getOber(2000), getOber(3000), getOber(4000)])
//   .pipe(Os.mergeAll())
//   .subscribe(item => console.log(item));

// Rx
//   .from(Promise.resolve({name: 'Jack'}))
//   .pipe(
//     arg => {
//       console.log(arg)
//       return Os.pluck('name')(arg);
//     },
//     Os.tap(console.log),
//     Os.catchError(err => {
//       console.log(err, '=====');
//       return 'abc'
//     }),
//   )
//   .subscribe(v => console.log(v, '-----'))

//   // console.log(Os)

// Rx
//   .defer(() => Rx.from('333'))
//   .pipe()
//   .subscribe(data => console.log(data))



// const foo = Rx.Observable.create(observer => {
//   console.log('-=-==--=');
//   observer.next(1);
//   observer.next(2);
//   observer.complete();
//   observer.next(3);
//   observers.next(4);
//   // observer.error(err);
// });

// foo.subscribe({

//   next(value) { console.log(value) ;},
  
//   complete() { console.log('completed');},
  
//   error(err) { console.error(err); }
  
// });
// foo.subscribe(v => console.log(v));
// var subject = new Rx.Subject();

// subject.subscribe({

//   next: (v) => console.log('observerA: ' + v)

//   });

//   subject.subscribe({

//   next: (v) => console.log('observerB: ' + v)

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
//   ).subscribe(area => console.log(area));

let left = 0;
let middle = 0;
let right = 0;
let counter = 0;

const btnLeft$ = Rx
  .fromEvent(document.getElementById('btn-left'), 'click')
  .pipe(
    Os.map(() => ++left),
    Os.takeWhile(v => v < 5),
    Os.map(() => `left: ${left}`),
    Os.tap(
      v => console.log(v),
      null,
      v => console.log('completed', v),
    )
  );
const btnMiddle$ = Rx.fromEvent(document.getElementById('btn-middle'), 'click').pipe(Os.map(() => `middle ${++middle}`));
const btnRight$ = Rx.fromEvent(document.getElementById('btn-right'), 'click').pipe(Os.map(() => `right ${++right}`));

Rx
  .concat(btnLeft$, btnMiddle$, btnRight$)
  .subscribe(v => console.log(v))

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
result.subscribe(x => console.log(x));
*/

// timer1.subscribe(v => console.log(v))

// const p$ = Rx.from(new Promise(resolve => {
//   console.log(++counter, '-------');
//   resolve(counter);
// }));
// Rx
//   .merge(btnLeft$, btnRight$)
//   .subscribe(v => console.log(v))

// btnLeft$
//   // .pipe(Os.map(() => ++left))
//   .pipe(Os.mergeMap(() => btnRight$.pipe(
//     Os.map(() => [left, right])
//   )))
//   .subscribe( v => console.log(v))


// p$
//   .pipe(
//     Os.retry(v => {
//       console.log(v < 10);
//       return v < 10;
//     })
//   )
//   .subscribe(v => console.log(v, '======='))

// Rx
//   .from([10, 20, 30])
//   .pipe(
//     Os.mergeMap(v => btn$.pipe(
//       Os.map(() => [++counter * v, counter]),
//     )),
//   )
//   .subscribe(v => console.log(v));

// Rx
//   .from([10, 20, 30])
//   .pipe(
//     Os.switchMap(v => btn$.pipe(
//       Os.map(() => [++counter * v, counter]),
//     )),
//   )
//   .subscribe(v => console.log(v));


// Rx.from([{name: 'John', age: 13}])
//   .subscribe(obj => console.log(obj))


  // document.getElementById('btn').addEventListener('click', function(e){console.log(this === e.currentTarget, this === e.target)})

// Rx
//   .zip(width$, height$, (w, h) => w * h)
//   .subscribe(area => console.log('面积：', area));




// Rx
//   .of(1, 2, 3)
//   .pipe(
//     Os.switchMap(a => Rx.of(4, 5).pipe(Os.map(b => `${a} | ${b}`)))
//   )
//   .subscribe(v => console.log(v))


  