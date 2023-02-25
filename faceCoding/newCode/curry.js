function curry(fn, ...args1) {
  return fn.length <= args1.length ? fn(...args1) : curry.bind(null, fn, ...args1)
}

function fn() {
  let result = [];
  function add(...args) {
  // ...args剩余参数,可以获取到传进来的参数
    result = [...result, ...args]
    return add;
  };
  // 创建一个取代 valueOf 方法的函数,覆盖自定义对象的 valueOf 方法
  add.toString = () => result.reduce((sum, k) => sum + k, 0);
  return add;
};
 let add = fn()
  console.log(+add(1)(2)(3)(4)) // --->10
  // let add2 = fn();
  console.log(+add2(1, 2, 3)(4)) // --->10