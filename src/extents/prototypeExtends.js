// 原型继承

/* 
  特点：
    1. 非常纯粹的继承关系，实例是子类的实例，也是父类的实例
    2. 父类新增原型方法、原型属性，子类都能访问到
    3. 简单易于实现
  缺点：
    1. 想要为子类增添属性和方法，必须在new People()这样的语句之后执行，不能放到构造器中
    2. 无法实现多继承
    3. 来自原型对象的所有属性被所有实例共享
    4. 创建子类实例时，无法向父类构造函数传参
*/
function People(name) {
  this.name = name || "People";
  this.eat = () => {
    console.log("people can eat");
  };
}
People.prototype.say = () => {
  console.log("我是一个人");
};

function Student() {}
Student.prototype = new People("学生");

const xiaoming = new Student();
xiaoming.eat();
xiaoming.say();
console.log(xiaoming.name);
