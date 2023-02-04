const obj = {
  a: {
         b: 1,
         c: 2,
         d: {e: 5}
     },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
 }
 
//  flatten(obj) 结果返回如下
 // {
 //  'a.b': 1,
 //  'a.c': 2,
 //  'a.d.e': 5,
 //  'b[0]': 1,
 //  'b[1]': 3,
 //  'b[2].a': 2,
 //  'b[2].b': 3
 //   c: 3
 // }

 function flatten(obj) {
  let result = {}
  function transfrom (current, prefix = "obj") {
    if (typeof current === "object" && current !== null) {
      if (Array.isArray(current)) {
        current.forEach((res, index) => {
          transfrom(res, `${prefix}[${index}]`) 
        })
      } else {
        for (let key in current) {
          transfrom(current[key], `${ prefix }.${key}`)
        }
      }
    } else {
      result[prefix] = current
      return current
    }
  }
  transfrom(obj)
  return result
 }

 console.log(flatten(obj))
