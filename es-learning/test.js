function uploadFiles(files){

  return new Promise((resolve, reject) => {
    if(files.length < 1){
      reject(new Error('empty array')) ;
    }
  
    const max = 3;
  
    let counter = 0;
  
    function _inner(){
      const ret = ajax(files[counter]).then(() => {
        couter += 1;
        if(counter < files.length){
          _inner(counter);
        }else{
          resolve();
        }
      });
      counter += 1;
    }
  
    for(let i = 0; i < max; i++){
      _inner();
    }
  });
}


/** answer 2 */

function bestGroup(originArr, max){
  let ret = [];
  
  // n*logn
  originArr = originArr.sort();

  originArr.forEach((item, idx) => {
    ret.push({
      items: [item],
      summary: item,
      idxs: [idx],
      flag: true,
    });
  });

  // n*n*n
  originArr.forEach((num, idx) => {

    const retl = ret.length;

    for(let i = 0; i < retl; i++){

      if(ret[i].flag){

        if(ret[i].summary + num <= max && !ret[i].idxs.includes(idx)){
          ret.push({
            flag: true,
            items: [...ret[i].items, num],
            summary: ret[i].summary + num,
            idxs: [...ret[i].idxs, idx],
          });
        }else{
          ret[i].flag = false;
        }

      }
    }
  });

  ret = ret.filter(item => Boolean(item));

  ret.sort((a, b) => {
    if(b.summary !== a.summary){
      return b.summary - a.summary;
    }else{
      return b.idxs.length - a.idxs.length;
    }
  });

  const idxStrs = [];

  ret = ret.filter(item => item.summary === ret[0].summary);

  return ret.map(item => item.items);
}

// const arr = [1, 9, 2, 3, 8, 5, 6, 2, 1, 3,];

// const max = 10;

// console.log(bestGroup(arr, max))


function allSubsets(arr){
  if(Array.isArray(arr)){
    const ret = [];

    arr.forEach(arrItem => {
      ret.forEach(retItem => retItem.push(arrItem));
      ret.push([arrItem]);
    });
    return ret;
  }

  return [];
}


console.log(allSubsets([1, 2, 3]));