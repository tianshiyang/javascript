Function.prototype.MyCall = function(context, ...args) {
  if (typeof this !== "function") {
    return
  }
  context = context || window
  context.fn = this
  let result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.MyApply = function (context, args) {
  if (typeof this !== "function") {
    return
  }
  context = context || window
  context.fn = this
  let result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.MyBind = function (context, ...args) {
  if (typeof this !== "function") {
    return
  }
  context = context || window
  context.fn = this
  return function(...args2) {
    let result = context.fn(...args, ...args2)
    delete context.fn
    return result
  }
}

// demo
const obj1 = {
  name: "张三",
  sayName: function () {
    console.log(`我是${this.name}`);
  },
};

const obj2 = {
  sayName: function (age, edu) {
    console.log(`我是${this.name}, 今年${age}, ${edu}学`);
  },
};
// obj1.sayName();
obj2.sayName.MyBind(obj1)(22, "大1学");
// obj2.sayName;