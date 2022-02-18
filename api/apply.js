// apply 实现

// eslint-disable-next-line no-extend-native
Function.prototype.myApply = function(context) {
  if(!context) {
    context = window
  }
  // 如果担心context上原来就有fn，害怕被覆盖，可以使用es6 Symbol()来保证键的唯一，或者使用Math.random() 生成一个唯一键
  context.fn = this;
  let args = arguments[1];
  let result;
  if(args) {
    // 隐式绑定的把调用apply函数的this绑定到context上
    result  = context.fn(...args);
  } else {
    result = context.fn()
  }
  delete context.fn;
  return result;
}