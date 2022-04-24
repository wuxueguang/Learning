

function quickSort(arr, compare = (a, b) => a - b){
  if(arr.length === 0){
    return [];
  }

  const left = [];
  const right = [];
  let pivot = arr[0];

  for(let i = 1; i < arr.length; i++){
    if(arr[i] < pivot){
      left.push(arr[i]);
    }else{
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat(pivot, quickSort(right));
}


console.log(quickSort([333, 222, 555, 111, 666, 777, 121]));