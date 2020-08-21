

function* test(){
    yield new Promise(resolve => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    });
    yield new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, 1000);
    });
    yield new Promise(resolve => {
        setTimeout(() => {
            resolve(3);
        }, 1000);
    });
}

// let t = test();
// let ret;
// do{
//     ret = t.next()
// }while(!ret.done);

// console.log(test()[Symbol.iterator])
// const t = test();

// console.log(t.next());
// console.log(t.next());
// console.log(t.next());






/*function* gen(){
    for(let i = 0; i< 6; i++) yield i;
}

const arr = gen();

console.log(arr[Symbol.iterator]);

for(let n of arr) console.log(n);*/

/*function* gen(){}

const arr = gen();

console.log(arr === arr[Symbol.iterator]())*/

/*let iterable = {
    [Symbol.iterator]() {
        return {
            i: 0,
            next() {
                if (this.i < 3) {
                    return {
                        value: this.i++,
                        done: false
                    };
                }
                return {
                    value: undefined,
                    done: true
                };
            }
        };
    }
};

for (let value of iterable) {
    console.log(value);
}*/
// 0
// 1
// 2
// const getP = msg => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(msg);
//     }, 1000);
// });

// function* test(){
//     const step1 = yield getP('p1');
//     return step1 + 'p2';
// }

// const t = test();

// async function f(){
//     const step1 = await t.next().value;
//     console.log(t.next(step1).value)
// }

// f();

// function* gen(x){
//     const y = 2 * (yield (x + 1));
//     console.log('y:', y);
//     const z = yield(y / 3);
//     console.log('z:', z);
//     return (x + y + z);
// }

// const iter = gen(5);

// iter.next();
// iter.next();
// iter.next();

// iter.next();
// iter.next(12);
// iter.next(13);

const getP = msg => new Promise(resolve => {
    setTimeout(() => resolve(msg), 1000);
});

function* gen(){
    const hello = yield getP('hello');
    console.log('1 ', hello);
    const world = yield getP('world');
    console.log('2 ', world);

    yield console.log(hello, world);
}

const iter = gen();
let msg;
iter.next().value.then(msg => {
    iter.next(msg).value.then(msg => {
        iter.next(msg);
    });
});



