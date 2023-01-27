class EventEmitter {
  cache = {}
  constructor() {}
  on(event, func) {
    if (!this.cache[event]) {
      this.cache[event] = []
    }
    this.cache[event].push(func)
  }
  emit(event, ...args) {
    this.cache[event].forEach(fn => {
      fn.call(this, ...args)
    })
  }
}

// 测试
let eventBus = new EventEmitter()

let fn1 = function(name, age) {
	console.log(`${name} ${age}`)
}
let fn2 = function(name, age) {
	console.log(`hello, ${name} ${age}`)
}

eventBus.on('aaa', fn1)
eventBus.on('aaa', fn2)
eventBus.emit('aaa', '布兰', 12)
// '布兰 12'
// 'hello, 布兰 12'