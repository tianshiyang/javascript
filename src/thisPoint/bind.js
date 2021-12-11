Function.prototype.myBind = function () {
  if (typeof this !== "function") {
    throw TypeError("调用者不是一个方法")
  }
}