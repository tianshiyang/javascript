Function.prototype.myCall = function (_this) {
  if (typeof this !== "function") {
    throw new TypeError("调用者不是一个方法");
  }
  _this = _this || window;
  // arguments: call函数第一个参数是要改变到的对象，第二个参数及以后，是call携带的属性，如call(Object, "name", "age")
  let args = Array.from(arguments).slice(1);
  // 当前this是指调用call的方法
  // 先将call挂载到要改变的实例上
  _this.fn = this;
  // result 方法
  let result = _this.fn(...args);
  delete _this.fn;
  return result;
};

// 方式2
Function.prototype.myCall2 = function (_this, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("调用者不是一个方法");
  }
  context = _this || window;
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result;
};

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
obj2.sayName.myCall2(obj1, 22, "大学");
// obj2.sayName;
