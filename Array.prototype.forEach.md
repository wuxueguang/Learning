```javascript

let arr0 = Array(10)
arr0.forEach(() => arr0[i] = i)

let arr1 = Array(10)
arr1.forEach((v, i) => arr1[i] = i)

let arr2 = Array(10)
for(let i = 0; i < arr2.length; i++){
	arr2[i] = i
}

let arr3 = [0,1,2,3,4,5,6,7,8,9]
arr3.forEach(() => arr3.push(arr3.length))

let arr4 = [0,1,2,3,4,5,6,7,8,9]
arr4.forEach(() => arr4.shift())

let arr5 = [0,1,2,3,4,5,6,7,8,9]
arr5.forEach(() => arr5.pop())

//问 arr0 arr1 arr2 arr3 arr4 arr5 的数组项分别是什么

console.log(arr0, arr1, arr2, arr3, arr4, arr5)

```