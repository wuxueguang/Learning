

function subArrays(arr){
  const ret = [];

  arr.forEach(arrItem => {
    const l = ret.length;

    for(let i = 0; i < l; i++){
      console.log(arrItem, i)
      ret.push(`${ret[i]},${arrItem}`);
    }
    ret.push(String(arrItem));
  });

  return ret;
  // return ret.sort((a, b) => {
  //   return a.length !== b.length ? a.length - b.length : a[0] - b[0];
  // });
}

const arr = [];
for(let i = 1; i <= 5; i++){
  arr.push(i);
}
console.log(arr);
const subs = subArrays(arr);
console.log(subs.length, subs);
// subs.forEach(item => console.log(item.toString()));

// const arr = [1];


// for(let i of arr){
//   console.log(i);
//   arr.push(i);
// }