console.log('interval');
let count = 0;
let si = setInterval(() => {
    console.log('interval', count++);
    clearInterval(si);
}, 0);