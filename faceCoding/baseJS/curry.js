function curry(fn, ...args) {
  // console.log(fn.length)
  
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}

function sum(a,b,c) {
  return a + b +c
}

// console.log(curry(sum, 1,2,3))

let fn = curry(function (a, b, c, d, e) {
  console.log(a + b + c + d + e)
})

fn(1, 2, 3, 4, 5)  // 15
fn(1, 2)(3, 4, 5)
fn(1, 2)(3)(4)(5)
fn(1)(2)(3)(4)(5)
