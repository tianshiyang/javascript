// 浅拷贝 拷贝引用类型的为地址
//方式1
function shallow(data) {
  let obj = {};
  for (let key in data) {
    obj[key] = data[key];
  }
  return obj;
}

// 方式2
function shallow2(data) {
  return { ...data };
}

// 方式3
function shallow3(data) {
  /* 
    Object.assign 为ES6的合并对象
      第一个参数为目标对象，其余参数为源对象
      如果出现同名，则后面对象的属性会覆盖前面对象的属性
   */
  return Object.assign({}, data);
}

// test
let obj = {
  name: "张三",
  age: "15",
  hobby: {
    sport: "basketBall",
    foot: "apple",
  },
};

let obj2 = shallow3(obj);
obj2.name = "lisi";
obj2.hobby.sport = "football";
console.log("obj.name = " + obj.name);
console.log("obj2.name = " + obj2.name);
console.log("obj.hobby.sport = " + obj.hobby.sport);
console.log("obj2.hobby.sport = " + obj2.hobby.sport);
