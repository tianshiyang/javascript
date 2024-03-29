let bucked = new WeakMap()
let activeEffect = null

function trigger(target, key) {
  if (!activeEffect) {
    return
  }
  let targetMap = bucked.get(target)
  if (!targetMap) {
    bucked.set(target, targetMap = new Map())
  }
  let dep = targetMap.get(key)
  if (!dep) {
    targetMap.set(key, dep = new Set())
  }
  dep.add(activeEffect)
}

function track(target, key) {
  let targetMap = bucked.get(target)
  if (!targetMap) {
    return
  }
  let dep = targetMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}

function effect(callBack) {
  activeEffect = callBack
  callBack()
  activeEffect = null
}

function reactive(obj) {
  let handler = {
    get(target, key, reciver) {
      // console.log("get - ", key)
      let result = Reflect.get(target, key, reciver)
      trigger(target, key)
      if (typeof result === "object" && target !== null) {
        return reactive(result)
      }
      return result
    },
    set(target, key, value, reciver) {
      // console.log("set - ", key)
      let oldValue = Reflect.get(target, key, reciver) 
      let flag = true
      if (oldValue !== value) {
        flag = Reflect.set(target, key, value, reciver)
        track(target, key)
      }
      return flag
    }
  }
  return new Proxy(obj, handler)
}

function ref(val) {
  return reactive({
    value: val
  })
}

function computed(fn) {
  const result = ref()
  effect(() => result.value = fn()) // 执行computed传入函数
  return result
}

// const obj = {
//   name: "张三",
//   age: 25,
//   other: {
//     sex: "男",
//     birthday: "11111"
//   }
// }
// let count = 0 
// const obj1 = reactive(obj)
// let strchange = `obj.name = ${obj1.name}`
// effect(() => {
//   strchange = `obj.name = ${obj1.name}` + count ++
// })
// obj1.name = "王五"
// console.log(strchange)


