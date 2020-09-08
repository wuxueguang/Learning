import * as Rx from "rxjs";
import * as Os from "rxjs/operators";

const getOber = t => Rx.from(new Promise(resolve => {
  setTimeout(() => {
    resolve(t);
  }, t);
}));

// Rx
//   .from([getOber(1000), getOber(2000), getOber(3000), getOber(4000)])
//   .pipe(Os.mergeAll())
//   .subscribe(item => console.log(item));

// Rx
//   .from(Promise.reject({name: 'Jack'}))
//   .pipe(
//     Os.pluck('name'),
//     Os.tap(console.log),
//     Os.catchError(err => {
//       console.log(err);
//       return 'ttt'
//     }),
//   )
//   .subscribe(v => console.log(v))

  // console.log(Os)

Rx
  .defer(() => Rx.from('333'))
  .pipe()
  .subscribe(data => console.log(data))


