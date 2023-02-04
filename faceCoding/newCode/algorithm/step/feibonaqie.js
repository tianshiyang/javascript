function fabonaqie(n) {
  if (n <= 2) {
    return 1
  }
  return fabonaqie(n - 1) + fabonaqie(n -2)
}
let result = fabonaqie(8)
console.log(result)