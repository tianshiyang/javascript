function curry(fn, ...args) {
  console.log(fn.length)
  
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}

function sum(a,b,c) {
  return a + b +c
}

console.log(curry(sum, 1,2,3))