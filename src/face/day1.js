// 千分位加, 比如12345 -> 12，345
const _comma = (number) => {
  if (number < 1000) {
    return number
  } else {
    return _comma(Math.floor(number / 1000)) + "," + Math.floor(number % 1000)
  }
}
// console.log(_comma(1234567890))




// 请补全JavaScript代码，该函数接收两个参数分别为旧版本、新版本，当新版本高于旧版本时表明需要更新，返回true，否则返回false。
// 注意：
// 1. 版本号格式均为"X.X.X"
// 2. X∈[0,9]
// 3. 当两个版本号相同时，不需要更新
const _shouldUpdate = (oldVersion, newVersion) => {
  // 补全代码
  const parse = (value) => {
    let valueNumber = value.split(".").join("")
    return Number(valueNumber)
  }
  return parse(oldVersion) < parse(newVersion)

}
console.log(_shouldUpdate('9.0.1','9.1.0'))

// 