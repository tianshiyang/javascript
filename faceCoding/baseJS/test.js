function test(str) {
  let obj = {}
  for (let i in str) {
    obj[str[i]] = obj[str[i]] ? ++obj[str[i]] : 1
  }
  let result = ""
  for (let key in obj) {
    result += `${obj[key]}${key}`
  }
  console.log(result)
}
test("aaabbbdddddfff")