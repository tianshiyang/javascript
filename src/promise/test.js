const MyPromise = require("./promise.js");
// const promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("success");
//   }, 500);
// });

// function other() {
//   return new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("other");
//     }, 1000);
//   });
// }
// promise
//   .then((value) => {
//     console.log(1);
//     console.log("resolve", value);
//     return other();
//   })
//   .then((value) => {
//     console.log(2);
//     console.log("resolve", value);
//   });

// const promise = new MyPromise((resolve, reject) => {
//   resolve("succ");
// });

// promise
//   .then()
//   .then()
//   .then((value) => console.log(value));

// MyPromise.resolve()
//   .then(() => {
//     console.log(0);
//     return MyPromise.resolve(4);
//   })
//   .then((res) => {
//     console.log(res);
//   });

const p1 = MyPromise.resolve(1);
const p2 = new MyPromise((resolve) => {
  setTimeout(() => resolve(2), 1000);
});
const p3 = new MyPromise((resolve) => {
  setTimeout(() => resolve(3), 3000);
});
// 1. 所有的Promise都成功了
const p11 = MyPromise.all([p1, p2, p3]).then(console.log); // [ 1, 2, 3 ]
