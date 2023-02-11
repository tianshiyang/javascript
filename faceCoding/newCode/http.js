function ajax(method, url, data, fn) {
  let xmlHttp = new XMLHttpRequest()
  xmlHttp.setRequestHeader("Content-type", "application/json")
  xmlHttp.open(method, url)
  xmlHttp.onreadystatechange = function () {
    if (this.readyState !== 4) {
      return
    }
    if (this.status == 200 || this.status === 304) {
      fn(xmlHttp.responseText)
    }
  }
  xmlHttp.send(data)
}
