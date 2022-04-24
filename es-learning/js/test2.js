

/* function isInstanceOf(obj, fn){
  while(obj.__proto__){
    if(fn.prototype === obj.__proto__){
      return true;
    }else{
      obj = obj.__proto__;
    }
  }
  return false;
}

await fn(); */



/* function fn(tree){
  let level = 0;
  tree.level = level;

  const stack = [tree];
  const ret = [];

  while(stack.length){
    const cur = stack.pop();

    if(cur.flag){
      if(Array.isArray(ret[cur.level])){
        ret[cur.level].push(cur);
      }else{
        ret[cur.level] = [cur];
      }
    }else{
      if(!cur.left && !cur.right){
        if(Array.isArray(ret[cur.level])){
          ret[cur.level].push(cur);
        }else{
          ret[cur.level] = [cur];
        }
      }else{
        cur.flag = true;
        stack.push(cur);

        if(cur.right){
          cur.right.level = cur.level + 1;
          stack.push(cur.right);
        }

        if(cur.left){
          cur.left.level = cur.level + 1;
          stack.push(cur.left);
        }
      }
    }
  }

  return ret;
} */