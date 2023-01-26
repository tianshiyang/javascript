function deepClone(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj
  }
  let result = null
  if (Array.isArray(obj)) {
    result = []
  } else {
    result = {}
  }

  for (let key in obj) {
    result[key] = typeof obj === "object" ? deepClone(obj[key]) : obj[key]
  }
  return result
}