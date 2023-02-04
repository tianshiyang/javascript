function sleep(fn, delay) {
  let currentTime = new Date().getTime()
  while (true) {
    if (new Date().getTime() - currentTime > delay) {
      fn()
      return
    }
  }
}

function sleep2(fn, delay) {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      fn()
      resolve()
    }, delay)
  })
  // p.then(() => {
  //   fn()
  // })
}

sleep2(function() {
  console.log(1234)
}, 1000)