let activeEffect = null

function effect(fn) {
  activeEffect = fn
  fn()
  activeEffect = null
}

let bucked = new WeakMap()
function trigger(target, key) {
  if (!activeEffect) {
    return
  }
  let targetMap = bucked.get(target)
  if (!targetMap) {
    bucked.set(target, target = new Map())
  }
  let depsMap = targetMap.get(key)
  if (!depsMap) {
    depsMap.set(key, depsMap = new Set())
  }
  depsMap.add(activeEffect)
}

function track(target, key) {
  let targetMap = bucked.get(target)
  if (!targetMap) {
    return
  }

  let depsMap = target.get(key)
  if (depsMap) {
    depsMap.forEach(effect => {
      effect()
    })
  }
}

function reactive(obj) {
  const handler = {
    get(target, key, receiver) {
      trigger(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      let oldValue = Reflect.get(target, key, receiver)
      let result = false
      if (value !== oldValue) {
        result = Reflect.set(target, key, value, receiver)
      }
      track(target, key)
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