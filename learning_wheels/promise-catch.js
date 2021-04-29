const { resolve } = require("path");

// new Promise((res, rej) => {
//   setTimeout(() => {
//     res();
//   }, 1000);
// })
// // .catch(err => {
// //   console.log('direct catch:', err);
// // })
// .catch(err => {
//   console.log('direct catch:', err);
// })
// .then(null, err => {
//   console.log('--------- then catch --------:', err);
// })
// .then(() => {
//   throw(new Error('error in then hendler'));
// })
// ;

// case 1
try{
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('reject');
    }, 1000);
  })
}catch(err){
  console.log('try catch log:', err)
}

// case 2
try{
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('reject');
    }, 1000);
  })
  .then(null, () => {
    throw(new Error('Error in reject handler.'))
  })
}catch(err){
  console.log('try catch log:', err)
}

// case 3
try{
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('reject');
    }, 1000);
  })
  .catch(() => {
    throw(new Error('Error in reject handler.'))
  })
}catch(err){
  console.log('try catch log:', err)
}

// case 4
try{
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('reject');
      resolve();
    }, 1000);
  })
  .then(() => {
    throw new Error('Error in resolve.');
  }, null);
}catch(err){
  console.log('try catch log:', err)
}

new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject('reject');
    resolve();
  }, 1000);
})
.then(() => {
  throw new Error('Error in resolve.');
})
.then(null, err => {
  console.log('------- Log in promise-then:', err, '-------');
})
;


Promise.resolve()
// .catch(async () => {
//   await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve();
//     }, 1000);
//   });
//   // return 'data';
// })
// .catch(new Function)
.then(data => {
  console.log('------ then ------', data);
  throw new Error('test');
})
// .finally(data => {
//   console.log('finally -----', data);
//   return 'data';
// })
.catch(err => {
  console.log('----', err)
})

;

// How to make promise settled?
new Promise(resolve => {
  resolve('fulfilled data')
});

new Promise((_, reject) => {
  reject('rejected reason');
})
.catch(err => console.log(typeof err));

new Promise(() => {
  // rejected
  throw new Error('rejected reason');
})
.catch(err => console.log(typeof err));



new Promise(() => {
  // rejected
  const inner = () => {
    throw new Error('rejected reason');
  }
  inner();
})
.catch(err => console.log(typeof err, err));



Promise.resolve('resolve data')
.then(NaN)
.then(data => console.log('--- onResolved ---', data));

Promise.resolve('resolve data')
.then(() => {
  throw new Error('rejected reason');
})
.catch(err => console.log('--- onRejected ---', err));


function createNewPromise(currentPromise, onSettled){
  return new Promise(async (resolve, reject) => {
    if(typeof onSettled !== 'function'){
      currentPromise.then(data => resolve(data), err => reject(err));
    }else{
      currentPromise.then(data => {
        try{
          resolve(onSettled(data));
        }catch(err){
          reject(onSettled(err));
        }
      }, err => reject(onSettled(err)));
    }
  });
}


(async function(){
  try{
    // await new Promise((resolve, reject) => {
    //   reject('rejected');
    // });
    throw 'rejected';
  }catch(err){
    console.log(typeof err)
  }
})()