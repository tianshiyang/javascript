class Emitter {
  constructor() {
    this.cache = new Map()
  }
  on(key, fn) {
    if (!this.cache.get(key)) {
      this.cache.set(key, new Set())
    }
    this.cache.get(key).add(fn)
  }
  emit(key, ...args) {
    if (this.cache.get(key)) {
      [...this.cache.get(key)].forEach(fn => {
        fn(...args)
      })
    }
  }
  off(key, fn) {
    if (this.cache.get(key)) {
      this.cache.get(key).delete(fn)
    }
  }
}

function fn1(value1, value2) {
  console.log(`this is fn1 and params  value1 = ${value1}, value2 = ${value2} `)
}
function fn2(value1, value2) {
  console.log(`这是fn2，参数是 value1 = ${value1}, value2 = ${value2} `)
}
let user = new Emitter()
user.on("key", fn1)
user.on("key", fn2)
user.emit("key", "参数1", "参数2")
user.off("key", fn1)
user.emit("key", "参数3", "参数4")