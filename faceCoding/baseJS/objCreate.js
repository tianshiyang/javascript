function CreateObject(params) {
  function F() {}
  F.prototype = params
  return new F()
}