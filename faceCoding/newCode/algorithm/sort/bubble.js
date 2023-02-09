const arr = [2,3,1,8,10,9,6,5,7]
function bubble(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        let tem = arr[j]
        arr[j] = arr[i]
        arr[i] = tem
      }
    }
  }
  return arr
}

console.log(bubble(arr))