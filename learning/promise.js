
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
    // reject('reject');
  }, 1000);
});

p.catch(err => console.log('Log in catch:', err));
p.then(() => {
  // console.log('Log in then:', err);
  return new Error('Error in onRejected.')
})
.then(err => console.log(err));