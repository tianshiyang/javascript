/* 
  typeof
  缺点：typof null 的值为Object，无法辨别是null还是Object
*/
/* 
  instanceof
  缺点：只能判断对象是否存在于目标对象的原型链上
*/
/* 
  Object.prototype.toString.call()
    一种最好的基本类型检测方式Object.prototype.toString.call()他可以区分null，string，boolean，number，undefined，array
  function,Object,date,math数据类型
  缺点：不能细分谁是谁的对象
*/

// ------------------------
console.log("null ==  " + typeof null); // object
console.log("function == " + typeof Function); // function
console.log("[] == " + typeof []); // object
console.log("{} == " + typeof {}); // Object
// ------------------------
function Foo() {}
const foo = new Foo();
const number = new Number(1);

console.log("foo instanceof Foo" + foo instanceof Foo); // true
console.log("null instanceof Object ====" + null instanceof Object);
console.log("number instanceof Number" + number instanceof Number); // true
console.log(123 instanceof Number); // false -> 不能判断字面量的基本数据类型
console.log(number); // [Number: 1]

// -----------------------------------------constructor
var d = new Number(1);
var e = 1;
function fn() {
  console.log("ming");
}
var date = new Date();
var arr = [1, 2, 3];
var reg = /[hbc]at/gi;

console.log("e.constructor == " + e.constructor); //ƒ Number() { [native code] }
console.log("e.constructor.name ==" + e.constructor.name); //Number
console.log("fn.constructor.name ==" + fn.constructor.name); // Function
console.log("date.constructor.name == " + date.constructor.name); // Date
console.log("arr.constructor.name == " + arr.constructor.name); // Array
console.log("reg.constructor.name == " + reg.constructor.name); // RegExp

// --------------------------------------
console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"
console.log(Object.prototype.toString.call(null)); // "[object Null]"
console.log(Object.prototype.toString.call(123)); // "[object Number]"
console.log(Object.prototype.toString.call("abc")); // "[object String]"
console.log(Object.prototype.toString.call(true)); // "[object Boolean]"

function fn() {
  console.log("ming");
}
var date = new Date();
var arr = [1, 2, 3];
var reg = /[hbc]at/gi;
console.log(Object.prototype.toString.call(fn)); // "[object Function]"
console.log(Object.prototype.toString.call(date)); // "[object Date]"
console.log(Object.prototype.toString.call(arr)); // "[object Array]"
console.log(Object.prototype.toString.call(reg)); // "[object RegExp]"
