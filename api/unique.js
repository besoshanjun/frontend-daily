// 去重

var a =  [1, 1, '1', '2', 1, '2', 3, '3', '2', 2]
function unique(arr) {
    var obj = {}
    return arr.filter((item => obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)))
}

console.log(unique(a)) 