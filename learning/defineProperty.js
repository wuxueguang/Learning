// const obj = {};

// const obj01 = Object.defineProperty(obj, 'name', {
//     value: 1,
//     set: () => {}
// });

// console.log(obj01.name)

// const arr = [0, 1, 2, 3, 4, 5];
const arr = {
    [Symbol.iterator]: function(){
        return this.gen();
    },
    gen: function*(){
        for(let i = 0; i < 6; i++) yield 0;
    }
};
const iterator = arr[Symbol.iterator]();
let item;

console.log(iterator[Symbol.iterator])

do{
    item = iterator.next();
    console.log(item);;
}while(!item.done);