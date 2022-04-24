function mergeSort(arr){
  if(arr.length >= 2){
    let step = 1;
    let left, right;

    while(step < arr.length){
      left = 0;
      right = step;

      while(right + step <= arr.length){
        mergeArrays(arr, left, left + step, right, right + step);
        left = right + step;
        right = left + step;
      }

      if(right < arr.length){
        mergeArrays(arr, left, left + step, right, arr.length);
      }

      step *= 2;
    }
  }
}

function mergeArrays(arr, startLeft, stopLeft, startRight, stopRight){
  let rightArr = new Array(stopRight - startRight + 1);
  let leftArr = new Array(stopLeft - startLeft + 1);
  
  k = startRight;
  for(let i = 0; i < (rightArr.length - 1); i++){
    rightArr[i] = arr[k];
    k += 1;
  }

  k = startLeft;
  for(let i = 0; i < (leftArr.length - 1); i++){
    leftArr[i] = arr[k];
    k += 1;
  }

  rightArr[rightArr.length - 1] = Infinity;
  leftArr[leftArr.length - 1] = Infinity;

  let m = 0;
  let n = 0;

  for(let k = startLeft; k < stopRight; ++k){
    if(leftArr[m] <= rightArr[n]){
      arr[k] = leftArr[m];
      m += 1;
    }else{
      arr[k] = rightArr[n];
      n += 1;
    }
  }
}

const arr = [9,7,10,4,6,3,1,8];
mergeSort(arr);
console.log(arr);