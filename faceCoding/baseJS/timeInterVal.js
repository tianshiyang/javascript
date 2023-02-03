let stop = true
let timer = null

function mySetInterval(fn, delay) {
  if (stop) {
    stop = false
    timer = setTimeout(() => {
      fn()
      stop = true
      mySetInterval(fn, delay)
    }, delay)
  }
  return timer
}

function clear() {
  clearTimeout(timer)
}

let timeout = mySetInterval(() => console.log(123213), 1000)

setTimeout(() => {
  clear()
}, 5000)