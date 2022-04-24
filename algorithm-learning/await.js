
/* const test1 = async () =>{
  const r1 = await p1;
  console.log(r1);
  const r2 = await Path2D;
  console.log(r2);
}; */

function* test2(){
  const r1 = yield new Promise(resolve => {
    setTimeout(() => {
      resolve(11111);
    }, 2000);
  });
  console.log(r1);
  const r2 = yield new Promise(resolve => {
    setTimeout(() => {
      resolve(22222);
    }, 2000);
  });
  console.log(r2);
};

const async = generator => () => {
  const g = generator();

  const inner = (value) => {
    const ret = g.next(value);
    Promise.resolve(ret.value).then(data => {
      inner(data);
    });
  };
  
  inner();
}

const ttt = async(test2);

ttt();