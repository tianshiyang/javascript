// 描述 给定一个数组arr，返回arr的最长无重复元素子数组的长度，无重复指的是所有数字都不相同。
// 子数组是连续的，比如[1,3,5,7,9]的子数组有[1,3]，[3,5,7]等等，但是[1,3,7]不是子数组

// 示例1 输入：
// [2,3,4,5]
// 返回值： 4
// 说明： [2,3,4,5]是最长子数组

// 示例2 输入： [2,2,3,4,3]
// 返回值： 3
// 说明：[2,3,4]是最长子数组

function fn1(arr) {
  if (arr.length <= 1) {
    return arr.length
  }
  let result = [],
  max = 0
  for (let value of arr) {
    while (result.includes(value)) {
      result.shift()
    }
    result.push(value)
    max = Math.max(max, result.length)
  }
  return max
}
console.log(fn1([2,2,3,4,3]))

function fn2(arr) {
  
}