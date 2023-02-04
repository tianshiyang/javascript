function myInstanceof(left, right) {
  let leftProto = left.__proto__
  let rightProtoType = right.prototype
  while (leftProto) {
    if (leftProto === rightProtoType) {
      return true
    }
    leftProto = leftProto.__proto__
  }
  return false
}