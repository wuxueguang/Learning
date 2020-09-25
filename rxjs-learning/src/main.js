import * as Rx from "rxjs";
import * as Os from "rxjs/operators";

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

Rx
  .from(Promise.resolve({name: 'Jack'}))
  .pipe(
    arg => {
      console.log(arg)
      return Os.pluck('name')(arg);
    },
    Os.tap(console.log),
    Os.catchError(err => {
      console.log(err, '=====');
      return 'abc'
    }),
  )
  .subscribe(v => console.log(v, '-----'))

//   // console.log(Os)

// Rx
//   .defer(() => Rx.from('333'))
//   .pipe()
//   .subscribe(data => console.log(data))


