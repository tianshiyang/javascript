function flat(arr, depth = 1) {
  if (depth == 0) {
    return arr
  }
  return arr.reduce((res, value) => {
    if (Array.isArray(value)) {
      res = res.concat(flat(value, depth - 1))
    } else {
      res = res.concat(value)
    }
    return res
  }, [])
}