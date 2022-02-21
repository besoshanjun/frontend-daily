// 模版字符串替换
let str = "{{name}}很name厉害，才{{age}}岁，性别是{{sex}}, {{我}}哈哈";

let obj = {
  name: "丁浛峻",
  age: 18,
  sex: '男',
  '我': 'wo'
};

// 1.
function test(str = "", obj) {
  let _s = str;
  Object.keys(obj).forEach(key => {
    _s = _s.replace(/\{\{(\w*|\p{sc=Han})\}\}/u, obj[key]);
  })
  console.log('_s',_s);
}

//2.
function render(str = '', obj) {
  return str.replace(/\{\{(\w+)}}/g, (match, key) => obj[key] || key)
}

// render(str, obj);
console.log('render', render(str, obj));

test(str, obj);