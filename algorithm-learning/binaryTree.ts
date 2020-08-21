

interface TreeNode {
  left?: TreeNode,
  right?: TreeNode
}

function traverse(treeNode: TreeNode): void{
  if(treeNode !== null){
    traverse(treeNode.left);
    console.log(treeNode);
    traverse(treeNode.right);
  }
}