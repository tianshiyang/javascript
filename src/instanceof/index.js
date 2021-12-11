/* 
原型关系：
  1. 每个class都有显示原型prototype
  2. 每个实例都有隐形原型__proto__
  3. 实例的隐式原型__proto__指向对应class的prototype
*/
/* 
基于原型的执行规则：
  1. 获取属性或执行方法的时候
  2. 首先在自身属性和方法寻找
  3. 如果找不到则自动去隐式原型__proto__中查找
  4. 隐式原型__proto__正好对应class的显示原型prototype
*/
function myInstanceof(L, R) {
  let RP = R.prototype;
  let LP = L.__proto__;
  while (true) {
    if (LP == null) {
      return false;
    }
    if (LP == RP) {
      return true;
    }
    LP = LP.__proto__;
  }
}

// demo
class People {
  say() {
    console.log("我是人");
  }
}
class Student extends People {
  study() {
    console.log("我在学习");
  }
}

class Boy extends Student {
  play() {
    console.log("男生会玩游戏");
  }
}
const xiaoming = new Boy();
console.log(xiaoming);
xiaoming.say();
xiaoming.study();
xiaoming.play();
console.log(myInstanceof(xiaoming, People));
