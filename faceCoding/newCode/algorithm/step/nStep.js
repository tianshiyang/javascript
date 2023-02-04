function nStep(num) {
  if (num === 1 || num === 2) {
    return num
  }
  return nStep(num - 1) + nStep(num -2)
}
console.log(nStep(10))