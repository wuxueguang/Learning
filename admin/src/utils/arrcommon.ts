/**
 *数组删改查
 */

/**
 * 查找
 * @param obj 查找的目标对象{key:value},key为要查找的键名，value为键值
 * @param arr 目标数组
 */
export function findKeyFromTargetArr(obj, arr) {
  let len = arr.length;
  if (len === 0) return -1;
  for (let key in obj) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][key] === obj[key]) {
        return i;
      }
    }
  }
  return -1;
}
/**
 * 替换
 * @param src 被替换的对象信息{key: value}
 * @param arr 目标数组
 * @param dst 要替换的对象信息{key: 要替换的value值}
 */
export function replaceKeyFromTargetArr(src, arr, dst) {
  let len = arr.length;
  if (len === 0) return arr;
  for (let key in src) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][key] === src[key]) {
        arr[i] = dst;
        break;
      }
    }
  }
  return arr;
}

/**
 *
 * @param {*} obj 删除的对象信息{key: value}
 * @param {*} arr 目标数组
 */
export function delKeyFromTargetArr(obj, arr) {
  let len = arr.length;
  if (len === 0) return arr;
  for (let key in obj) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][key] === obj[key]) {
        arr.splice(i, 1);
        break;
      }
    }
  }
  return arr;
}
