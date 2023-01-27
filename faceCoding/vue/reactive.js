const isObject = (obj) => {
  return obj !== null && typeof obj === "object"
}

let activeEffect
const effect = (callBack) => {
  activeEffect = callBack
  callBack()
  activeEffect = null
}

let targetMap = new WeakMap()
const trigger = (target, key) => {
  if (!activeEffect) {
    return
  }
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map())
  }

  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, dep = new Set())
  }

  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
  }
}

function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach((effect) => {
      effect()
    })
  }
}

function reactive(obj) {
  const handler = {
    get(target, key, receiver) {
      console.log("获取" + target + "的" + key)
      const result = Reflect.get(target, key, receiver)
      trigger(target, key)
      if (isObject(result)) {
        return reactive(result)
      }
      return result
    },
    set(target, key, value, receiver) {
      
      let result = true
      const oldValue = Reflect.get(target, key, receiver)
      if (oldValue !== value) {
        console.log("设置" + target + "的" + key + "为" + value)
        track(target, key)
        result = Reflect.set(target, key, value, receiver)
      }
      return result
    }
  }
  return new Proxy(obj, handler)
}

const obj = {
  name: "张三",
  age: 25,
  other: {
    sex: "男",
    birthday: "11111"
  }
}

effect(() => {
  delete obj.age
})

const obj1 = reactive(obj)
obj1.name = "王五"
obj1.other.sex = "nv"
console.log(obj)