
class Node{
  constructor(value = null, left = null, right = null){
    this.value = value;
    this.leftChild = left;
    this.rightChild = right;
  }
}

function add(currentNode, newNode, compare){

  const comparedRet = compare(newNode.value, currentNode.value);

  if(comparedRet > 0){   // new value > current value
    if(currentNode.rightChild instanceof Node){
      add(currentNode.rightChild, newNode, compare);
    }else{
      currentNode.rightChild = newNode;
    }
  }else if(comparedRet < 0){  // new value < current value
    if(currentNode.leftChild instanceof Node){
      add(currentNode.leftChild, newNode, compare);
    }else{
      currentNode.leftChild = newNode;
    }
  }else{
    console.log('Repeated value!');
  }
}

class BinarySearchTree{
  static from(iterable, compareCallback){
    return new BinarySearchTree(iterable, compareCallback);
  }

  constructor(iterable, compare){
    this.compare = typeof compare === 'function' ? compare : (a, b) => a - b;
    this.root = new Node(iterable[0]);

    for(let i = 1; i < iterable.length; i++){
      add(this.root, new Node(iterable[i]), this.compare);
    }
  }

  add(value = null){
    add(new Node(value), this.root, this.compare);
  }

  find(value, current){
    current = current || this.root;
    if(current.value === value){
      return true;
    }else if(value > current.value){
      return current.rightChild ? this.find(value, current.rightChild) : false;
    }else{
      return current.leftChild ? this.find(value, current.leftChild) : false;
    }
  }

  traverse(type){   // 1 后序遍历； 2 中序遍历； 3 前序遍历。
    const stack = [this.root];
    const ret = [];

    while(stack.length){
      const current = stack.pop();

      if(current instanceof Node){
        const { value, leftChild, rightChild } = current;

        if(type === 3){
          stack.push(value);
        }

        if(rightChild){
          stack.push(rightChild);
        }

        if(type === 2){
          stack.push(value);
        }

        if(leftChild){
          stack.push(leftChild);
        }

        if(type === 1){
          stack.push(value);
        }
      }else{
        ret.push(current);
      }
    }

    return ret;
  }
}

// console.log(
//   BinarySearchTree.from(
//     [20, 18, 22, 19, 17, 23, 21]
//   ).find(19)
// );

/* const traverseRootAtFirst = (currentNode, ret) => {
  if(currentNode){
    ret = ret || [];

    ret.push(currentNode.value);
    traverseRootAtFirst(currentNode.leftChild, ret);
    traverseRootAtFirst(currentNode.rightChild, ret);
  }

  return ret;
};

const traverseRootAtMiddle = (currentNode, ret) => {
  if(currentNode){
    ret = ret || [];

    traverseRootAtMiddle(currentNode.leftChild, ret);
    ret.push(currentNode.value);
    traverseRootAtMiddle(currentNode.rightChild, ret);
  }

  return ret;
};

const traverseRootAtLast = (currentNode, ret) => {
  ret = ret || [];
  if(currentNode){
    ret.push(currentNode.value);
    traverseRootAtLast(currentNode.rightChild, ret);
    traverseRootAtLast(currentNode.leftChild, ret);
  }

  return ret;
 };*/