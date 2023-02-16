Function.prototype.MyCall = function(context, ...args) {
  if (typeof this !== "function") {
    return
  }
  context = context || window
  context.fn = this
  let result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.MyApply = function (context, args) {
  if (typeof this !== "function") {
    return
  }
  context = context || window
  context.fn = this
  let result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.MyBind = function (context, ...args) {
  if (typeof this !== "function") {
    return
  }
  context = context || window
  context.fn = this
  return function(...args2) {
    let result = context.fn(...args, ...args2)
    delete context.fn
    return result
  }
}
