for(var i = 0; i < 10; i++){
  setTimeout(() => console.log(i), 1000);
}

for(let j = 0; j < 10; j++){
  setTimeout(() => console.log(j), 1000);
}

// const zero = () => {
//   console.log('zero excuted');
//   return 0;
// };

// // let k;

// for(let k = zero(); k < 10; k++){
//   // console.log(k);
//   setTimeout(() => console.log(k), 1000);
// }


let l;
for(l = 0; l < 10; l++){
  (l => {
    setTimeout(() => console.log(l), 1000);
  })(l);
}

