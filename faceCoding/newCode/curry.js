function curry(fn, ...args1) {
  return fn.length <= args1.length ? fn(...args1) : curry.bind(null, fn, ...args1)
}