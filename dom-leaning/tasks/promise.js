setTimeout(() => {
    console.log('setTimeout');
});

(new Promise((resolve, reject) => {
    resolve();
})).then(() => {
    console.log(1);
    (new Promise((resolve, reject) => {
        resolve();
    })).then(() => {
        console.log(2);
        (new Promise((resolve, reject) => {
            resolve();
        })).then(() => {
            console.log(3);
        });
    });
});