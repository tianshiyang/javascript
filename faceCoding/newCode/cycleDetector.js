function cycleDetector(obj) {
  let resultArr = []
  let flag = false
  function cycle(o) {
    if (typeof o === "object" && o !== null) {
      if (resultArr.includes(o)) {
        flag = true
        return
      }
      resultArr.push(o)
      for (let value in o) {
        cycle(o[value])
      }
    }
  }
  cycle(obj)
  return flag
}

var obj = {
  a: {
      c: [
          1, 2
      ]
  },
  b: 1
}
// obj.a.c.d = obj
console.log(cycleDetector(obj))