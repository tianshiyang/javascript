function myNew(fn, ...args) {
  if (typeof fn !== "function") {
    return
  }
  let obj = Object.create(fn.prototype)
  let result = fn.apply(obj, args)
  if (result && typeof result === "object") {
    return result
  }
  return obj
}
