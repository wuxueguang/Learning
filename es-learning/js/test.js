/* // []


function check(arr){
  if(arr.length < 2){
    return null;
  }
  const arr1 = arr.sort();
  const curlate = arr1.toString();
  const s = arr1[0];
  const l = arr[arr.length - 1];
  let ret;

  for(let i = s; i <= l; i++){
    if(!(new RegExp(`(^|,)${i}(,|$)`)).test(curlate)){
      ret = i;
      break;
    }
  }

  return ret;
}

console.log(check([5, 3, 6])) */



/* function loader(urls, callback){
  let max = urls.length > 10 ? 10 : urls.length;
  let counter = 0;

  const _inner = () => {
    const img = new Image;
    img.src = urls[counter++];
    img.addEventListener('load', () => {
      callback(img);
      if(counter < urls.length){
        _inner();
      }
    });
  };

  while(max--){
    _inner();
  }
} */

// '1*2+3-4'   + * -

// eval(str);
/* function _inner(str, operator){
  
  const arr = str.split(operator);

  let ret = Number(arr[0].trim());

  arr.forEach((num, idx) => {
    if(idx === 0) return;

    num = Number(num.trim());
    switch(operator){
      case '*':
        ret *= num;
        break;
      case '+':
        ret += num;
        break;
      case '-':
        ret -= num;
    }
  });

  return ret;
}*/

// function calculate(str){
//   str = str.replace(/ /g, '');
//   if(/^\*/.test(str)){
//     throw new Error('格式不正确');
//   }
//   str = str.replace(/^\+/, '');
//   str = /^\-/.test(str) ? `0${str}` : str;

//   str = str.replace(/\d+(\*\d)+/g, str => _inner(str, '*'));
//   str = str.replace(/\d+(\+\d)+/g, str => _inner(str, '+'));
//   str = str.replace(/\d+(\-\d)+/g, str => _inner(str, '-'));

//   return Number(str.trim());
// }

// console.log(calculate('*3-3-3-3-3')) */

















/* function uploadFiles(blobs, callback){

  return new Promise((resolve, reject) => {
    if(blobs.length < 1){
      reject(new Error('empty array')) ;
    }
  
    const max = 3;
  
    let counter = 0;
  
    function _inner(callback){
      const ret = ajax(blobs[counter]).then(() => {
        couter += 1;
        if(counter < blobs.length){
          _inner(counter);
        }else{
          resolve();
        }
      });
      counter += 1;
    }
  
    for(let i = 0; i < max; i++){
      _inner(callback);
    }
  });

  
}


function bestGroup(arr, max){
  const ret = [];
  
  arr.forEach((item, idx) => {
    for(let i = 0; i < ret.length; i++){
      if(ret[i].sum + item <= max){
        ret[i].push(item);
        ret[i].sum += item;
      }
    }

    ret[idx] = [item];
    ret[idx].sum = item;
  });

  ret.sort((a, b) => a.sum - b.sum);

  const cur = [ret.pop()];
  const maxSum = cur[0].sum;
  let last = ret.pop();

  while(last.sum === maxSum){
    cur.push(last);
    last = ret.pop();
  }

  return cur;

}

const arr = [1, 9, 2, 3, 5, 6, 1];


const max = 10;

console.log(bestGroup(arr, max)) */























/* function indexOf(a, b){
  
  const regexp = new RegExp(b);
  if(!regexp.test(a)){
    return -1;
  }

  let index;

  for(let i = 0; i < a.length; a++){
    if(a[i] === b[0]){
      index = i;

      let allSame = true;
      for(let j = 1; j < b.length; j++){
        if(b[j] !== a[i + j]){
          allSame = false;
        }
      }

      if(allSame){
        break;
      }
    }
  }

  return index;
} */



// function promisify(fn){

//   return function(...args){
    
//     return new Promise((resolve, reject) => {
//       fn(args[0], (...[error, ...rest]) => {
//         if(error){
//           reject(error);
//         }else{
//           resolve(...rest);
//         }
//       });
//     });
//   };
// }
// // readFile('a.txt', cb);
// const readFileAsync = promisify(readFile);

// readFileAsync('a.txt').then((...args) => {
//   console.log(...args);
// });

// class LRUCache{
//   constructor(size){
//     this.size = size;
//     this.data = new Map;
//   }
//   put(key, value){
//     const item = this.data.get(key);
//     if(item){
//       item.value = value;
//       item.count += 1;
//       item.st = Date.now();
//     }else if(this.data.length < this.size){
//       this.data.set(key, {
//         value,
//         count: 1,
//         st: Date.now(),
//       });
//     }else{
//       let min;
//       let allSameCount = true;
//       let keyToDelete;
//       this.data.keys().forEach((key, idx) => {
//         const { count } = this.data.get(key);
//         if(idx === 0){
//           min = count;
//         }else{
//           if(count !== min){
//             allSameCount = false;
//           }
//           if(min > count){
//             min = count;
//             keyToDelete = key;
//           }
//         }
//       });
//       if(allSameCount){
//         this.data.keys().forEach((key, idx) => {
//           const { st } = this.data.get(key);
  
//           if(idx === 0){
//             min = st;
//           }else{
//             if(min > st){
//               min = count;
//               keyToDelete = key;
//             }
//           }
//         });
//       }

//       this.data.delete(keyToDelete);
//       this.set(key, value);

//     }
//   }

//   get(key){
//     const item = this.data.get(key);
//     item.count += 1;
//     item.st = Date.now();

//     return item.value;
//   }
// }




/* function f(n){
  if(n === 0) return zero;
  if(n === 1) return one;

  let first = 0;
  let second = 1;
  
  for(let i = 2; i <= n; i++){
    second = second + first;
    first = second - first;
  }

  return second;
} */

















/* function isValid(str){
  const originStr = str;

  if(str.length % 2 !== 0) return false;

  const hasIlegal = /(\((\[|\{))|(\]|\})\)/g.test(originStr) || /(\[\{)|(\}\])/g.test(originStr);

  if(hasIlegal) return false;

  const regexp = /(\(\))|(\[\])|(\{\})/g;

  while(regexp.test(str)){
    str = str.replace(regexp, '');
  }

  return str.trim().length === 0;
}

console.log(isValid('((())){{}}[[]]')); */









// var isMatch = function(s, p) {
//   if(!/[?*]/.test(p)){
//       return s === p;
//   }

//   // if(!/\*/.test(p)){
//   //   p = p.replace(/\?/g, '[a-z]');
//   //   return (new RegExp(`^${p}$`)).test(s);
//   // }

//   p = p.replace(/\*+/g, '*');

//   p = p.replace(/(?<!\?)\*(?!\?)/g, '0+');

//   p = p.replace(/\?*\*\?*/g, str => `${str.length - 1}+`);

//   p = p.replace(/\?+/g, str => str.length);

// console.log(p);

//   // p = p.replace(/\?/g, '[a-z]');

//   // p = p.replace(/\*/g, '[a-z]*');

//   // if(p.split('[a-z]*').length === 1){
//   //   return (new RegExp(`^${p}$`)).test(s);
//   // }

//   // p = p.split('[a-z]*');

//   // let ret = true;
//   // let regexp;
//   // if(p[0] !== ''){
//   //   regexp = new RegExp(`^${p[0]}`);  
//   //   ret = regexp.test(s);
//   // }

//   // if(ret){
//   //   s = s.replace(regexp, '');
//   // }else{
//   //   return ret;
//   // }

//   // for(let i = 1; i < p.length; i++){
//   //   regexp = new RegExp([
//   //     '^',
//   //     '[a-z]*',
//   //     p[i] && p[i].indexOf('[a-z]') === -1 ? `(?<!${p[i]})` : '',
//   //     p[i],
//   //     i === p.length - 1 ? '$' : '',
//   //   ].join(''));

//   //   console.log(regexp, s);

//   //   ret = regexp.test(s);
//   //   if(ret){
//   //     s = s.replace(regexp, '');
//   //   }else{
//   //     break;
//   //   }
//   // }

//   // return ret;     
// };

// const s = "mississippi";
// const p = "m*?iss*d???iss??*?d*d*";

// console.log(isMatch(s, p));





















/* Promise.all = function(ps){
  if(!Array.isArray(ps)) throw new TypeError('array needed');

  const count = 0;
  const ret = [];

  return new Promise((resolve, reject) => {
    ps.forEach((p, idx) => {
      try{
        p.then(data => {
          ret[idx] = data;
          count += 1;
  
          if(count === ps.length){
            resolve(ret);
          }
        }).catch(err => {
          reject(err);
        });
      }catch(err){
        throw new TypeError('promise obj needed');
      }
    });
  });
}; */


// [2, 0, 1, 3, 0, 4, 0, 0] ——> [2, 1, 3, 4, 0, 0, 0, 0] 
// function fn(arr){

//   /* const exchange = (cur, next) => {
//     if(arr[next] !== 0){
//       arr[cur] = arr[next];
//       arr[next] = 0;
//     }else if(next + 1 < arr.length){
//       exchange(cur, next + 1);
//     }
//   };

//   for(let i = 0; i < arr.length; i++){
//     if(arr[i] === 0){
//       exchange(i, i + 1);
//     }
//   } */

//   for(let i = 0; i < arr.length; i++){
//     if(arr[i] === 0){
//       for(let j = i + 1; j < arr.length; j++){
//         if(arr[j] !== 0){
//           arr[i] = arr[j];
//           arr[j] = 0;
//           break;
//         }
//       }
//     }
//   }

//   return arr;
// }


// console.log(fn([2, 0, 1, 3, 0, 4, 0, 0]));










/* function fn(ns){
  const rs = {
    '2': 'abc'.split(''),
    '3': 'def'.split(''),
    '4': 'ghi'.split(''),
    '5': 'jkl'.split(''),
    '6': 'mno'.split(''),
    '7': 'pqrs'.split(''),
    '8': 'tuv'.split(''),
    '9': 'wxyz'.split(''),
  };

  let total = 1;
  Array.from(ns).forEach(c => {
    total *= rs[c].length;
  });

  const ret = [];
  for(let i = 0; i < total; i++){
    ret.push( ns.replace(/\d/g, n => rs[n][i % rs[n].length]) );
  }

  return ret;
}

console.log(fn('23')); */


/* 
  3 1
  4 1 + 3**1
  5 1 + 3**
*/


const threeSum = nums => {
  nums.sort();

  const negativeNums = [];
  const zeros = [];
  const positiveNums = [];

  nums.forEach(num => {
    if(num < 0){
      negativeNums.push(num);
    }else if(num === 0){
      zeros.push(num);
    }else{
      positiveNums.push(num);
    }
  });

  const zerosThreeSum = n => {
    if(n < 3){
      return 0;
    }

    let last = 1;
    for(let i = 4; i <= n; i++){
      last = last + last * 3;
    }

    return last;
  };

  const ret = [];

  let zeroGroupNum = zerosThreeSum(zeros.length);

  while(zeroGroupNum--){
    ret.push([0, 0, 0]);
  }

  if(zeros.length > 0){
    negativeNums.forEach(num => {
      if(positiveNums.includes(-num)){
        let zeroCount = zeros.length;
        while(zeroCount--){
          ret.push([num, -num, 0]);
        }
      }
    });
  }



  return ret;
};



const a = [-1, 0, 0, 2, 1, -3, 4];

console.log(threeSum(a));









