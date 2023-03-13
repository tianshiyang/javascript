var compress = function(chars) {
    let result = []
    let i = 0
    while (i < chars.length) {
        let curIndex = i
        while (chars[i] === chars[curIndex] && curIndex < chars.length - 1) {
            curIndex ++
        }
        result.push(chars[i], curIndex - i)
        i = curIndex
    }
    return result
};

console.log(compress(["a","a","b","b","c","c","c"]))