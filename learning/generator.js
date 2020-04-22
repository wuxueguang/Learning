

function* test(){
    yield console.log(1);
    yield console.log(2);
    yield console.log(3);
}

let t = test();
let ret;
do{
    ret = t.next()
}while(!ret.done);








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