function deepClone(target, map = new Map()) {
  if (typeof target !== "object" && target) {
    return target
  }
  if (map.get(target)) {
    return map.get(target)
  }
  let result = Array.isArray(target) ? [] : {}
  map.set(target, result)
  for (let key in target) {
    result[key] = deepClone(target[key], map)
  }
  return result
}

const a = {
  name: 'sunshine_lin',
  age: 23,
  hobbies: { sports: '篮球', tv: '雍正王朝' },
  works: ['2020', '2021']
}
a.key = a // 环引用
const b = deepClone(a)
console.log(b)

console.log(b === a)  // false