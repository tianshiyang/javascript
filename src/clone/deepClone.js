// 深拷贝
// 方式1
function deepClone(data) {
  let result;
  if (data === null || data === undefined) {
    result = data;
  }
  if (typeof data === "object") {
    if (Array.isArray(data)) {
      result = [];
      data.forEach((res) => {
        result.push(deepClone(res));
      });
    } else {
      // 普通对象
      result = {};
      for (let key in data) {
        result[key] = deepClone(data[key]);
      }
    }
  } else {
    // 基础数据类型
    result = data;
  }
  return result;
}

// 方式2
// JSON.parse(JSON.stringify())
// 缺点：它是不可以拷贝 undefined ， function， RegExp 等等类型的

// test
let obj = {
  name: "张三",
  age: "15",
  hobby: {
    sport: "basketBall",
    foot: "apple",
  },
  arr: [1, 2, 3, 4, 5],
};

let obj2 = deepClone(obj);
obj2.name = "lisi";
obj2.hobby.sport = "football";
obj2.arr.push(6);
console.log("obj.name = " + obj.name);
console.log("obj2.name = " + obj2.name);
console.log("obj.hobby.sport = " + obj.hobby.sport);
console.log("obj.arr = " + obj.arr);
console.log("obj2.arr = " + obj2.arr);
