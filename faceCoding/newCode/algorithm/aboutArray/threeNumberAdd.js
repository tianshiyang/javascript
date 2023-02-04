// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a ，b ，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
// 注意： 答案中不可以包含重复的三元组

// 示例：

// 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
// 满足要求的三元组集合为：
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]
function threeSum(arr, target) {
  if (arr.length < 3) {
    return false
  }
  let result = []
  let sortArr = arr.sort((a, b) => a - b)
  for (let i = 0; i < sortArr.length - 1; i ++) {
    if (sortArr[i] === sortArr[i - 1]) {
      // 过滤掉重复的项
      continue
    }
    let left = i + 1
    let right = sortArr.length - 1
    let currentTarget = target - sortArr[i]
    while (left < right) {
      if (sortArr[left] + sortArr[right] < currentTarget) {
        left ++
      } else if (sortArr[left] + sortArr[right] > currentTarget) {
        right --
      } else {
        result.push([sortArr[i], sortArr[left], sortArr[right]])
        left ++
        right --
      }
    }
  }
  return [...new Set(result)]
}

console.log(threeSum([-1, 0, 1, 2, -1, -4], 0))