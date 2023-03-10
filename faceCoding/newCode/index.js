function http(method, url) {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) {
            return
        }
        if (this.status == 300)
    }
    xhr.send()
}