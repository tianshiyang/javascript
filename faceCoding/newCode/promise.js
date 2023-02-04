class myPromise {
  constructor(fn) {
    this.status = "pending"
    this.successCallBack = []
    this.errorCallBack = []
    let resolve = (value) => {
      this.value = value
      this.status = "filfuiled"
      while (this.successCallBack.length) {
        this.successCallBack.shift()(this.value)
      }
    }
    let reject = (value) => {
      this.value = value
      this.value = "rejected"
      while (this.errorCallBack.length) {
        this.errorCallBack.shift()(this.value)
      }
    }
    try {
      fn(resolve, reject)
    } catch (e) {
      this.onreject(e)
    }
  }

  then(onResolveCallBack, onRejectCallBack) {
    onResolveCallBack = typeof onResolveCallBack === "function" ? onResolveCallBack : (value) => value
    onRejectCallBack = typeof onRejectCallBack === "function" ? onRejectCallBack : (value) => value
    let p = new myPromise((xresolve, xreject) => {
      if (this.status === "filfuiled") {
        queueMicrotask(() => {
          let x = onResolveCallBack(this.value)
          this.resolvePromise(x, p, xresolve, xreject)
        })
      } else if (this.status === "rejected") {
        queueMicrotask(() => {
          let x = onRejectCallBack(this.value)
          this.resolvePromise(x, p, xresolve, xreject)
        })
      } else if (this.status === "pending") {
        this.successCallBack.push(() => {
          queueMicrotask(() => {
            let x = onResolveCallBack(this.value)
            this.resolvePromise(x, p, xresolve, xreject)
          })
        })
        this.errorCallBack.push(() => {
          queueMicrotask(() => {
            let x = onRejectCallBack(this.value)
            this.resolvePromise(x, p, xresolve, xreject) 
          })
        })
      }
    })
    return p
  }
  resolvePromise(x, p, resolve, reject) {
    if (x === p) {
      reject("循环调用")
      return
    }
    x instanceof myPromise ? x.then(resolve, reject) : resolve(x)
  }

  static resolve(fn) {
    if (fn && fn instanceof myPromise) {
      return fn
    }
    return new myPromise((resolve, reject) => {
      resolve(fn)
    })
  }

  static all(arr) {
    return new myPromise((resolve, reject) => {
      if (!arr.length) {
        resolve([])
      }
      let result = []
      let count = 0
      for (let i = 0; i < arr.length; i++) {
        let promise = arr[i] instanceof myPromise ? arr[i] : resolve(arr[i])
        promise.then((res) => {
          count ++
          result[i] = res
          if (count === arr.length) {
            resolve(result)
            return
          }
        })
      }
    })
  }

  static race(arr) {
    return new myPromise((resolve, reject) => {
      if (!arr.length) {
        resolve([])
      }

      arr.forEach(res => {
        let x = res instanceof myPromise ? res : myPromise.resolve(res)
        x.then(item => {
          resolve(item)
          return
        })
      })
    })
  }
}

const p1 = myPromise.resolve(1);
const p2 = new myPromise((resolve) => {
  setTimeout(() => resolve(2), 1000);
});
const p3 = new myPromise((resolve) => {
  setTimeout(() => resolve(3), 3000);
});
// 1. 所有的Promise都成功了
const p11 = myPromise.all([p1, p2, p3]).then(res => {
  console.log(res)
}); // [ 1, 2, 3 ]

myPromise.resolve(1).then(res => {
  return res *2
}).then(res => {
  return res *2
}).then(res => console.log(res))