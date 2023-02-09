// 有一堆整数，请把他们分成三份，确保每一份和尽量相等（11，42，23，4，5，6 4 5 6 11 23 42 56 78 90

function f1 (arr, count){
  //数组从大到小排序
  arr.sort((a,b) => b - a);
  //计算平均值
  let avg = arr.reduce((a,b) => a + b) / count;
  //从大到小求和，取最接近平均值的一组，放入二维数组
  let resArr = [];
  let current = 0;
  for (let i = 0; i < count - 1; i ++) {
    if (current + arr[arr.length - 1] / 2 < avg && i) {
      let currentNum = arr.pop();
      resArr[i-1].push(currentNum);
    }
    current = 0;
    resArr[i] = [];
    arr.forEach((item,index) => {
      current += item;
      arr.splice(index,1)
      resArr[i].push(item)
      if(current > avg){
          current -= item;
          arr.splice(index,0,item);
          resArr[i].pop();
      }
    })
  }
  resArr[count-1] = arr;
  return resArr
}
console.log(f1([11,42,23,4,5,6,4,5,6,11,23,42,56,78,90], 3))
