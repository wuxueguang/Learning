


function minNums(arr, num){
  const ret = arr.splice(0, num);

  if(ret.length < arr.length){
    arr.forEach(item => {
      for(let i = 0; i < ret.length; i++){
        if(ret[i] > item){
          ret[i] = item;
          break;
        }
      }
    });
  }else{
    ret.forEach((item, idx) => {
      for(let i = 0; i < arr.length; i++){
        if(item < ret[dix]){
          ret[idx] = item;
          break;
        }
      }
    })
  }
  

  return ret;
}


console.log(minNums([3,4,8,4,5,9,2,5], 3))