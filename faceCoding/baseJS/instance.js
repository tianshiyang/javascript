function myInstanceof(L, R) {
  let RProto = R.prototype
  let LProto = L.__proto__
  while (true) {
    if (!LProto) {
      return false
    }
    if (LProto === RProto) {
      return true
    }
    LProto = LProto.__proto__
  }
}

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