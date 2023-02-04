function jsonp(url, callbackname) {
  let script = document.createElement("script")
  script.src = url + `&callbackname=${callbackname}`
  document.appendChild(script)
  window[callbackname] = (res) => res
}