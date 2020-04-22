const name = Symbol.for('name');

const obj = {
    [name]: 'Tom',
    age: 14
};

// console.log(obj[name], '---')
// for(let n in obj) console.log(obj[n])

Object.getOwnPropertySymbols(obj).forEach(n => console.log(obj[n]))