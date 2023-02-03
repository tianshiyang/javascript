Function.prototype.myBind = function (context, ...args1) {
  context = context || window
  return (...args2) => {
    this.apply(context, [...args1, ...args2])
  }
}

Function.prototype.myCall = function(context, ...args) {
  context = context || window
  context.fn = this
  let result = context.fn(...args)
  delete context.fn
  return result
}

