function ajax(method, url, data, fn) {
  let xmlHttp = new XMLHttpRequest()
  xmlHttp.setRequestHeader("Content-type", "application/json")
  xmlHttp.open(method, url)
  xmlHttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      fn(xmlHttp.responseText)
    }
  }
  xmlHttp.send(data)
}
