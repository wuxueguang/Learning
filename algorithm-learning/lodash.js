

// const get = (obj, paths) => {
//   let ret = obj;
//   if([null, undefined].includes(ret)){
//     return ret;
//   }

//   for(let key of paths){

//     if()
//   }

// }



function fn(arr){
  let hasOverlap = false;
  const temp = [];

  for(let _arr of arr){
    if(temp.includes(_arr[0]) || temp.includes(_arr[_arr.length - 1])){
      hasOverlap = true;
      break;
    }
    for(let i = _arr[0]; i <= _arr[_arr.length - 1]; i++){
      temp.push(i);
    }
  }

  return hasOverlap;
}