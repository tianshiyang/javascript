Function.prototype.myApply = function (_this) {
  if (typeof this !== "function") {
    throw TypeError("调用者不是一个函数");
  }
  _this = _this || window;
  let result;
  _this.fn = this;
  if (arguments[1]) {
    result = _this.fn(...arguments[1]);
  } else {
    result = _this.fn();
  }
  delete _this.fn;
  return result;
};

// 方式2
Function.prototype.myApply2 = function (_this, args) {
  if (typeof this !== "function") {
    throw TypeError("调用者不是一个方法");
  }
  if (!Array.isArray(args)) {
    throw TypeError("参数应是个数组");
  }
  _this = _this || window;
  _this.fn = this;
  let result = _this.fn(...args);
  delete _this.fn;
  return result;
};
// demo
const obj1 = {
  name: "张三",
  sayName: function (age) {
    console.log(`我是${this.name},今年${age}岁`);
  },
};
const obj2 = {
  sayName: function (age, hobby) {
    console.log(`我是${this.name},今年${age}岁，爱好是${hobby}`);
  },
};

obj2.sayName.myApply2(obj1, [22, "打篮球"]);
