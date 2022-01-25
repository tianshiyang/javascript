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
    onFulfilledCallBack ? onFulfilledCallBack : this.value;
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
  // resolve静态方法
  static resolve = (value) => {
    if (value && value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  };

  // all resolve实现形式
  static all = (arr) => {
    return new MyPromise((resolve, reject) => {
      if (!arr.length) {
        resolve([]);
        return;
      }
      let count = 0;
      let result = [];
      arr.forEach((res, index) => {
        MyPromise.resolve(res).then((val) => {
          count++;
          result[index] = val;
          if (count === arr.length) {
            resolve(result);
          }
        });
      });
    });
  };

  // race
  static race = (arr) => {
    return new MyPromise((resolve, reject) => {
      if (!arr.length) {
        resolve([]);
        return;
      }
      arr.forEach((item, index) => {
        MyPromise.resolve(item).then((res) => {
          resolve(res);
          return;
        });
      });
    });
  };

  // // all 非resolve实现方式
  // static all = (arr) => {
  //   return new MyPromise((resolve, reject) => {
  //     if (!arr.length) {
  //       resolve([]);
  //       return
  //     }
  //     let count = 0;
  //     let result = [];
  //     arr.forEach((item, index) => {
  //       if (item instanceof MyPromise) {
  //         item.then((value) => {
  //           count++;
  //           result.push(value);
  //           if (count === arr.length) {
  //             resolve(result);
  //           }
  //         });
  //       }
  //     });
  //   });
  // };
}
module.exports = MyPromise;
