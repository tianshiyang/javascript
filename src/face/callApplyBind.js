Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") {
    return
  }
  context = context || window
  context.fn = this
  let result = null
  result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.myApply = function (context, args) {
  context = context || window
  context.fn = this
  let result = null
  result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.myBind = function(context, ...args) {
  context = context || window
  context.fn = this
  return function() {
    return context.fn(...args)
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
  }
}
obj2.sayName.myBind(obj1, 22, "大学");

