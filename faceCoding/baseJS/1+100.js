function add (num1, num2) {
  const num = num1 + num2
  if (num2 === 100) {
    return num1
  }
  return add(num, num2 + 1)
}
console.log(add(1,2))

console.log(10100/2)