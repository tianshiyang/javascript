// 盛最多水的容器
// 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是  (i, 0) 和 (i, height[i]) 。
// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
// 返回容器可以储存的最大水量

// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49 
// 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
function holdWather(arr) {
  let max = 0
  let left = 0
  let right = arr.length - 1
  while (left < right) {
    max = Math.max(Math.min(arr[left], arr[right]) * (right - left), max)
    if (left < right) {
      left ++
    } else {
      right --
    }
  }
  return max
}
console.log(holdWather([1,8,6,2,5,4,8,3,7]))
// holdWather()