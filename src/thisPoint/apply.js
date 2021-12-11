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

obj2.sayName.myApply(obj1, [22, "打篮球"]);
