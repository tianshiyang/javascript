const arr = [2,3,1,8,10,9,6,5,7]
function quick(arr) {
  if (arr.length <= 1) {
    return arr
  }
  let middleIndex = Math.floor(arr.length / 2)
  let middle = arr.splice(middleIndex, 1)[0]
  let leftArr = []
  let rightArr = []
  for (let i = 0; i < arr.length ; i++) {
    arr[i] < middle ? leftArr.push(arr[i]) : rightArr.push(arr[i])
  }
  return [...quick(leftArr), middle, ...quick(rightArr)]
}

console.log(quick(arr))