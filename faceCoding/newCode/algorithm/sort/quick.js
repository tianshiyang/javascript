function quick(arr) {
  if (arr.length <= 1) {
    return arr
  }
  let middleIndex = Math.floor(arr.length / 2)
  let middle = arr.splice(middleIndex, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i ++) {
    arr[i] < middle ? left.push(arr[i]) : right.push(arr[i])
  }
  return [...quick(left), middle, ...quick(right)]
}
const arr = [2,3,1,8,10,9,6,5,7]
console.log(quick(arr))