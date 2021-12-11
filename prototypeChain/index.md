什么是原型？ 什么是原型链
原型： 原型分为隐式原型和显式原型，每个对象都有一个隐式原型，它指向自己的构造函数的显式原型。

原型链： 多个__proto__组成的集合成为原型链
  所有实例的__proto__都指向他们构造函数的prototype
  所有的prototype都是对象，自然它的__proto__指向的是Object()的prototype
  所有的构造函数的隐式原型指向的都是Function()的显示原型
  Object的隐式原型是null
