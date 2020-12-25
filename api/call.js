// call 实现
// eslint-disable-next-line no-extend-native
Function.prototype.myCall = function (context = window, ...args) {
  if (this === Function.prototype) {
    return undefined; // 用于防止 Function.prototype.myCall() 直接调用
  }
  context = context || window;
  const fn = Symbol('fn');
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

var name = "is a function";
function a() {
  console.log(this.name);
}

var b = {
  name: "is b obj",
};
a();
a.myCall(b, "111");
