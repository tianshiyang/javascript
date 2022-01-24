const MyPromise = require("./promise.js");
const promise = new MyPromise((resolve, reject) => {
  // 目前这里只处理同步的问题
  setTimeout(() => {
    resolve("success");
  }, 500);
});

function other() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve("other");
    }, 1000);
  });
}
promise
  .then((value) => {
    console.log(1);
    console.log("resolve", value);
    return other();
  })
  .then((value) => {
    console.log(2);
    console.log("resolve", value);
  });
