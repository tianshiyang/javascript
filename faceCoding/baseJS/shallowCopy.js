function shallowCopy(obj) {
  if (typeof obj !== "object" || obj === null) return obj
  let result = null
  if (Array.isArray(obj)) {
    result = []
  } else {
    result = {}
  }
  for (let key in obj) {
    result[key] = obj[key]
  }
  return result
}

// 同样可以浅拷贝的方法，Object.assign(), 扩展符（{...obj}）