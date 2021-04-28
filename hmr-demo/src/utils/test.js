// const Promise = require('./index');

// const p = new Promise$((resolve, reject) => {
//     setTimeout(() => {
//         resolve('resolve data')
//         // reject('resolve data')
//     }, 1000);
// })

// p.then(data => {
//     console.log('---- p1 resolved ----', data);
//     throw 'rejected reason';
// }).then(null, rejectedReason => console.log('---- p2 rejected ----', rejectedReason))
// p.then(data => console.log('---- p3 resolved ----', data))


// Promise.reject('test').then(null, data => console.log(data));
const EventEmitter = require('./EventEmitter');

const eventEmitter = new EventEmitter;

eventEmitter.on('test', () => console.log('test'));

eventEmitter.emit('test');
eventEmitter.emit('test');
eventEmitter.emit('test');
