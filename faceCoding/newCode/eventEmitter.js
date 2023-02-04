class EventEmitter {
  constructor() {
    this.cacheEvent = new Map()
  }
  on(key, fn) {
    let eventArr = this.cacheEvent.get(key)
    if (!eventArr) {
      this.cacheEvent.set(key, eventArr = new Set())
    }
    eventArr.add(fn)
    
  }
  emit(key, ...args) {
    this.cacheEvent.get(key).forEach((fn) => {
      fn(...args)
    })
  }
}


let eventBus = new EventEmitter()

let fn1 = function(name, age) {
	console.log(`${name} ${age}`)
}
let fn2 = function(name, age) {
	console.log(`hello, ${name} ${age}`)
}

eventBus.on('aaa', fn1)
eventBus.on('aaa', fn2)
eventBus.emit('aaa', '布兰', 122)