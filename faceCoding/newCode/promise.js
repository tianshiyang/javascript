class MyPromise {
  constructor(fn) {
    this.status = "pendding"
    this.value = ""
    this.successCallBack = []
    this.errorCallBack = []
    let resolve = (value) => {
      this.value = value
      this.status = "filfulled"
      while (this.successCallBack.length) {
        this.successCallBack.shift()(value)
      }
    }
    let reject = (value) => {
      this.value = value
      this.status = "rejected"
      while (this.errorCallBack.length) {
        this.errorCallBack.shift()(this.value)
      }
    }
    try {
      fn(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }
  then(onResolveCallBack, onRejectCallBack) {
    onResolveCallBack = typeof onResolveCallBack === "function" ? onResolveCallBack : (value) => value
    onRejectCallBack = typeof onRejectCallBack === "function" ? onRejectCallBack : (value) => value
    let p = new MyPromise((resolve, reject) => {
      if (this.status === "filfulled") {
        queueMicrotask(() => {
          let x = onResolveCallBack(this.value)
          this.resolvePromise(p, x, resolve, reject)
        })
      } else if (this.status === "rejected") {
        queueMicrotask(() => {
          let x = onRejectCallBack(this.value)
          this.resolvePromise(p, x, resolve, reject)
        })
      } else if (this.status === "pendding") {
        this.successCallBack.push(() => {
          queueMicrotask(() => {
            let x = onResolveCallBack(this.value)
            this.resolvePromise(p, x, resolve, reject)
          })
        })
        this.errorCallBack.push(() => {
          queueMicrotask(() => {
            let x = onRejectCallBack(this.value)
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
  
  finally(callback) {
    return this.then((data) => {
      callback()
      return data
    })
  }

  static resolve(fn) {
    if (fn && fn instanceof MyPromise) {
      return fn
    } else {
      return new MyPromise((resolve, reject) => {
        resolve(fn)
      })
    }
  }

  static all(arr) {
    return new MyPromise((resolve, reject) => {
      if (!arr.length) {
        resolve([])
        return
      }
      let count = 0
      let result = []
      for (let i = 0; i < arr.length; i ++) {
        let p = arr[i] instanceof MyPromise ? arr[i] : MyPromise.resolve(arr[i])
        p.then(res => {
          result[i] = res
          count ++
          if (count === arr.length) {
            resolve(result)
            return
          }
        })
      }
    })
  }

  static race(arr) {
    return new MyPromise((resolve, reject) => {
      if (!arr.length) {
        resolve([])
      }
      for(let i = 0; i < arr.length; i ++) {
        let p = arr[i] instanceof MyPromise ? arr[i] : MyPromise.resolve(arr[i])
        p.then(res => {
          resolve(res)
          return
        })
      }
    })
  }
}


const p1 = MyPromise.resolve(1);
const p2 = new MyPromise((resolve) => {
  setTimeout(() => resolve(2), 1000);
});
p2.then((res) => res * 2).then(res => console.log(res)).finally(() => console.log(1111))
// console.log(p2)
// const p3 = new MyPromise((resolve) => {
//   setTimeout(() => resolve(3), 3000);
// });
// // 1. 所有的Promise都成功了
// const p11 = MyPromise.race([p1, p2, p3]).then(res => {
//   console.log(res)
// }); // [ 1, 2, 3 ]
// p11.finally(() => {
//   console.log(10000000)
// })