function componse(...args1) {
  return function (...args2) {
    let result = 0
    args1.forEach(res => {
      result += res.apply(this, args2)
    })
    console.log(this === window)
    return result
  }
}

function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
const a = componse(fn1, fn2, fn3, fn4);
console.log(a)
console.log(a(1))