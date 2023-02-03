class MyPromise {
  status = "pending"
  value
  onSuccessCallback = []
  onRejectCallback = []
  constructor(excutor) {
    this.status = "pending"
    this.onSuccessCallback = []
    this.onRejectCallback = []

    const resolve = (value) => {
      this.value = value
      this.status = "fulfuiled"
      while(this.onSuccessCallback.length) {
        this.onSuccessCallback.shift()(value)
      }
    }

    const reject = (value) => {
      this.value = value
      this.status = "reject"
      while(this.onRejectCallback.length) {
        this.onRejectCallback.shift()(value)
      }
    }

    try {
      excutor(resolve, reject)
    } catch (err) {
      reject(value)
    }
  }

  then(resolveCallback, rejectCallback) {
    resolveCallback = typeof resolveCallback === "function" ? resolveCallback : (val) => val
    rejectCallback = typeof resolveCallback === "function" ? rejectCallback : (val) => val
    let p = new MyPromise((resolve, reject) => {
      if (this.status === "fulfuiled") {
        queueMicrotask(() => {
          let x = resolveCallback(this.value)
          this.resolvePromise(p, x, resolve, reject)
        })
      }
      if (this.status === "reject") {
        queueMicrotask(() => {
          let x = rejectCallback(this.value)
          this.resolvePromise(p, x, resolve, reject)
        })
      }
      if (this.status === "pending") {
        this.onSuccessCallback.push(() => {
          queueMicrotask(() => {
            let x = resolveCallback(this.value)
            this.resolvePromise(p, x, resolve, reject)
          })
        })
        this.onRejectCallback.push(() => {
          queueMicrotask(() => {
            let x = rejectCallback(this.value)
            this.resolvePromise(p, x, resolve, reject)
          })
        })
      }
    })
    return p
  }

  resolvePromise(p, x, resolve, reject) {
    if (p === x) {
      return reject(new Error("ssss"))
    }
    if (x instanceof MyPromise) {
      x.then(resolve, reject)
    } else {
      resolve(x)
    }
  }

  static resolve(fn) {
    if (fn && fn instanceof MyPromise) {
      return fn
    }
    return new MyPromise((resolve, reject) => {
      resolve(fn)
    })
  }

  static all(arr) {
    return new MyPromise((resolve, reject) => {
      if (arr.length === 0) {
        resolve([])
        return
     }
 
     let count = 0
     let result = []
 
     arr.forEach((promise, index) => {
      let x = promise instanceof MyPromise ? promise : MyPromise.resolve(promise)
       x.then(res => {
         count ++
         result[index] = res
         if (count === arr.length) {
           resolve(result)
           return
         }
       })
     })
    })
  }

  static race(arr) {
    return new MyPromise((resolve, reject) => {
      if (arr.length === 0) {
        resolve([])
      }
      arr.forEach(promise => {
        let x = promise instanceof MyPromise ? promise : MyPromise.resolve(promise)
        x.then(res => {
          resolve(res)
          return
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

MyPromise.resolve(1).then(res => {
  return res *2
}).then(res => {
  return res *2
}).then(res => console.log(res))