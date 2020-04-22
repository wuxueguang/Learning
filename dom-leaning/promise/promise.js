const p = new Promise((resolve, reject) => {
    try{
        throw new Error('test');
        resolve('resolved');
    }catch(e){
        reject(e);
    }
    
    // setTimeout(resolve, 0);
});

p.then(null, err => {
    console.log('then catch', err);
}).catch(err => {
    console.log('catch', err);
})
// .then(() => {
//     throw new Error('ddd');
// });