// 去重
// 根据类型属性去重
var a =  [1, 1, '1', '2', 1, '2', 3, '3', '2', 2]
function unique(arr) {
    var obj = {}
    return arr.filter((item => obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)))
}

console.log(unique(a)) 

var arr = [
    1,
    1,
    "true",
    "true",
    true,
    true,
    15,
    15,
    false,
    false,
    undefined,
    undefined,
    null,
    null,
  ];
  
  // 去重
  // 1
  function unique1(arr) {
    return Array.from(new Set(arr));
  }
  console.log('unique1：', unique1(arr));
  
  // 2 indexOf去重
  function unique2(arr) {
    const result = [];
    for (const v of arr) {
      if (result.indexOf(v) === -1) {
        result.push(v);
      }
    }
    return result;
  }
  console.log('unique2: ', unique2(arr));
  
  //3 sort 去重
  function unique3(arr) {
    arr = arr.sort();
    var result = [arr[0]];
    for (let index = 1; index < arr.length; index++) { // i从1开始
      const v = arr[index];
      if (arr[index] !== arr[index - 1]) {
        result.push(v);
      }
    }
    return result;
  }
  console.log('unique3: ', unique3(arr));
  
  // 4 filter 去重
  function unique4(arr) {
    // 当前元素，在原始数组中从头开始查找，返回第一个索引==当前索引的值
   return arr.filter((item,index,arr) => arr.indexOf(item, 0) === index);
  }
  console.log('unique4: ', unique4(arr));
  