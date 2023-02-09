class MyPromise {
  constructor(executor) {
    this.status = "pending";
    this.value = ""
    this.successCallback = []
    this.errorCallback = []
    let resolve = (val) => {
      this.value = val
      this.status = "fulfilled"
      while (this.successCallback.length) {
        this.successCallback.shift()(this.value)
      }
    }
    let reject = (val) => {
      this.value = val
      this.status = "rejected"
      while (this.errorCallback.length) {
        this.errorCallback.shift()(this.value)
      }
    }
    
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(resolveCallback, rejectedCallback) {
    resolveCallback = typeof resolveCallback ==="function" ? resolveCallback : (value) => value
    rejectedCallback = typeof rejectedCallback === "function" ? rejectedCallback : (value) => value
    let p = new MyPromise((resolve, reject) => {
      if (this.status === "fulfilled") {
        queueMicrotask(() => {
          let x = resolveCallback(this.value)
          this.resolvePromise(p, x, resolve, reject)
        })
      } else if (this.status === "rejected") {
        queueMicrotask(() => {
          let x = rejectedCallback(this.value)
          this.resolvePromise(p, x, resolve, reject)
        })
      } else {
        this.successCallback.push(() => {
          queueMicrotask(() => {
            let x = resolveCallback(this.value)
            this.resolvePromise(p, x, resolve, reject)
          })
        })
        this.errorCallback.push(() => {
          queueMicrotask(() => {
            let x = rejectedCallback(this.value)
            this.resolvePromise(p, x, resolve, reject)
          })
        })
      }
    })
    return p
  }

  resolvePromise(p, x, resolve, reject) {
    if (p === x) {
      return reject("error")
    }
    if (x instanceof MyPromise) {
      x.then(resolve, reject)
    } else {
      resolve(x)
    }
  }

  static resolve(value) {
    if (value && value instanceof MyPromise) {
      return value
    } else {
      return new MyPromise((resolve, reject) => {
        resolve(value)
      })
    }
  }

  static all(arr) {
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
  }

  static race(arr) {
    return new MyPromise((resolve, reject) => {
      if (!arr.length) {
        resolve([])
      }
      arr.forEach((fn, index) => {
        MyPromise.resolve(fn).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    }) 
  }
}


const p1 = MyPromise.resolve(1);
const p2 = new MyPromise((resolve) => {
  setTimeout(() => resolve(2), 1000);
});
const p3 = new MyPromise((resolve) => {
  setTimeout(() => resolve(3), 3000);
});
// 1. 所有的Promise都成功了
const p11 = MyPromise.all([p1, p2, p3]).then(res => {
  console.log(res)
}); // [ 1, 2, 3 ]