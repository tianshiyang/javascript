function mySetTimeout(fn, delay) {
  let timer = null
  timer = setInterval(() => {
    fn()
    clearInterval(timer)
  }, delay)
}

mySetTimeout(() => console.log(456), 1000)