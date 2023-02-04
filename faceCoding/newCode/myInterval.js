
function myInterval(fn, timeout) {
  let timer
  const interval = () => {
    timer = setTimeout(() => {
      fn()
      interval(fn, timeout)
    }, timeout);
  }
  interval()
  return () => {
    clearTimeout(timer)
  }

}

let stop = myInterval(() => console.log(123), 1000)

setTimeout(() => stop(), 4000)