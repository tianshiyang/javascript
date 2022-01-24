class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }
  status = "pending";
  value = null;
  reason = null;
  successCallBack = [];
  errorCallBack = [];
  resolve = (value) => {
    if (this.status === "pending") {
      this.value = value;
      this.status = "fulfilled";
      while (this.successCallBack.length) {
        this.successCallBack.shift()(value);
      }
    }
  };
  reject = (reason) => {
    if (this.status === "pending") {
      this.reason = reason;
      this.status = "rejected";
      while (this.errorCallBack.length) {
        this.errorCallBack.shift()(reason);
      }
    }
  };
  then(onFulfilledCallBack, onRejectedCallBack) {
    const p2 = new MyPromise((resolve, reject) => {
      if (this.status === "fulfilled") {
        queueMicrotask(() => {
          let x = onFulfilledCallBack(this.value);
          this.resolvePromise(p2, x, resolve, reject);
        });
      } else if (this.status === "rejected") {
        queueMicrotask(() => {
          let x = onRejectedCallBack(this.reason);
          this.resolvePromise(p2, x, resolve, reject);
        });
      } else if (this.status === "pending") {
        this.successCallBack.push(() => {
          queueMicrotask(() => {
            // 相当于执行了new MyPromise
            let x = onFulfilledCallBack(this.value);
            this.resolvePromise(p2, x, resolve, reject);
          });
        });
        this.errorCallBack.push(() => {
          queueMicrotask(() => {
            let x = onRejectedCallBack(this.reason);
            this.resolvePromise(p2, x, resolve, reject);
          });
        });
      }
    });
    return p2;
  }
  resolvePromise(p2, x, resolve, reject) {
    if (p2 === x) {
      return reject(
        new TypeError("Chaining cycle detected for promise #<Promise>")
      );
    }
    if (x instanceof MyPromise) {
      // promise
      x.then(resolve, reject);
    } else {
      // 普通
      resolve(x);
    }
  }
}
module.exports = MyPromise;
