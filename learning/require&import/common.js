
const o1 = require('./counter');


setTimeout(() => {
    console.log(o1);
    const o2 = require('./counter');
    console.log(o2);
}, 1000);