class LUR {
  cacheArr = []
  cacheObj = {}
  constructor(max) {
    this.max = max
  }
  get(key) {
    this.cacheArr = this.cacheArr.filter(res => res !== key)
    this.cacheArr.unshift(key)
    return this.cacheObj[key] || -1
  }
  put(key, value) {
    this.cacheArr = this.cacheArr.filter(res => res !== key)
    this.cacheArr.unshift(key)
    this.cacheObj[key] = value
    if (this.cacheArr.length > this.max) {
      let key2 = this.cacheArr.pop()
      delete this.cacheObj[key2]
    }
  }
}

let cache = new LUR( 2 /* 缓存容量 */ );
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
console.log(cache.get(2));       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
console.log(cache.get(1));       // 返回 -1 (未找到)
console.log(cache.get(3));       // 返回  3
console.log(cache.get(4));       // 返回  4