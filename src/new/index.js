/* 
  创建一个新的对象
  继承父类原型上的方法.
  添加父类的属性到新的对象上并初始化. 保存方法的执行结果.
  如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象。
*/
function myNew(fn, ...args) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  // this指向obj
  let result = fn.apply(obj, args); // ...args将剩余参数放入了数组中
  // 如果执行结果有返回值
  return typeof result === "object" ? result : obj;
}

// demo
function Person(firtName, lastName) {
  this.firtName = firtName;
  this.lastName = lastName;
}
Person.prototype.getFullName = function () {
  return `${this.firtName} ${this.lastName}`;
};
const tsy = new Person("田", "世洋");
console.log("tsy", tsy);

const tsy2 = myNew(Person, "田", "世洋");
console.log("tsy2", tsy2);
