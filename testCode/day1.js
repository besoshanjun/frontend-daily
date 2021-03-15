//2021年03月08日

// 一. this 指向
const o1 = {
  text: 'o1',
  fn: function() {
      return this.text
  }
}
const o2 = {
  text: 'o2',
  fn: function() {
      return o1.fn()
  }
}
const o3 = {
  text: 'o3',
  fn: function() {
      var fn = o1.fn
      return fn()
  }
}

// console.log(o1.fn()) // 1
// console.log(o2.fn()) // 1  最终还是调用了o1.fn()
// console.log(o3.fn()) // undefined 最终相当于window.fn

// 让o2.fn输出o2

  // 1. 使用call/apply/bind实现  直接修改o2-> fn -> return o1.fn.apply(this)
  // console.log(o2.fn());  // o2

  // 2. 直接把o1.fn挂在到o2对象上 o2.fn -> o2.fn:o1.fn：this指向最后调用它的对象，在fn执行时，挂到o2对象上，提前进行了赋值操作
  // console.log(o2.fn()); // o2

  // function Foo(){
  //   this.name = 'besos';
  // }

  // new 操作符调用构造函数都做了什么
    // 创建一个新对象
    // 将构造函数的 this 指向这个新对象
    // 为这个对象添加属性、方法等
    // 返回这个新对象
    // 大概相当于 var obj = {} obj.__proto__ = Foo.prototype  Foo.cal(obj)
  // const instance = new Foo();
  // console.log(instance.name); // besos this指向了instance

  function Foo() {
    this.user = "besos"
    const o = {};
    return o;
  }
  const instance = new Foo();
  //如果构造函数中显式返回一个值，且返回的是一个对象，那么 this 就指向这个返回的对象；如果返回的不是一个对象，那么 this 仍然指向实例。
  console.log(instance.user); // undefined 如果构造函数显示return 则分两种情况1.return o; 输出undefined return 1; 输出besos

