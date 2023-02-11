// 描述 给出一个整数数组 A 和有序的整数数组B ，请将数组 B合并到数组 A中，变成一个有序的升序数组 注意：
// 1.可以假设 A数组有足够的空间存放 B数组的元素，A 和 B中初始的元素数目分别为 m和 n，A的数组空间大小为 m+n
// 2.不要返回合并的数组，返回是空的，将数组B 的数据合并到A里面就好了
// 3.A数组在[0,m-1]的范围也是有序的

// 例1: A: [1,2,3,0,0,0]，m=3 B: [2,5,6]，n=3 合并过后A为: A: [1,2,2,3,5,6]
// 示例1
// 输入：
// [4,5,6],[1,2,3]
// 复制
// 返回值：
// [1,2,3,4,5,6]

function fn1 (arr1, arr2) {
  return [...arr1, ...arr2].sort((a, b) => a -b)
}
console.log(fn1([4,5,6],[1,2,3]))

function fn2(arr1, arr2) {
  let arr1Temp = 0, arr2Temp = 0, result = []
  while (arr1Temp < arr1.length && arr2Temp < arr2.length) {
    if (arr1[arr1Temp] < arr2[arr2Temp]) {
      result.push(arr1[arr1Temp])
      arr1Temp++
    } else {
      result.push(arr2[arr2Temp])
      arr2Temp++
    }
  }
  if (arr1Temp < arr1.length - 1) {

    result.push(...arr1.slice(arr1Temp))
  }
  if (arr2Temp < arr2.length -1 ) {
    result.push(...arr2.slice(arr2Temp))
  }
  return result
}
console.log(fn2([4,5,6], [1,2,3]))