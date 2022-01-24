Function.prototype.myBind = function (_this, ...arr) {
  const context = _this || window;
  context.fn = this;
  return function () {
    return context.fn(...arr);
  };
};

// demo
const obj1 = {
  name: "张三",
  sayName: function () {
    console.log(`我是${this.name}`);
  },
};

const obj2 = {
  sayName: function (age) {
    console.log(`我是${this.name}, 今年${age}岁`);
  },
};

// obj1.sayName();
// obj2.sayName();
var a = {
  b: function () {
    var func = function (test) {
      console.log(this.c, test);
    }.myBind(this, "world");
    func();
  },
  c: "hello",
};
a.b();
