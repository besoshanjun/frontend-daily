// 实现new

function newFunc(...args) {
  console.log(Array.prototype.slice.call(args, 0));
  const constructor = args.shift(); // 取出args第一个参数，即目标构造函数 或者使用 args.shift();

  // 1.创建一个空对象，作为执行构造函数之后返回的对象实例
  // 2.将这个空对象的的原型(__proto__)指向构造函数的prototype属性
  const obj = Object.create(constructor.prototype); // 实现 obj.__proto__ === constructor.prototype;
  console.log("obj: ", obj);

  // 3.将这个构造函数的this指向空对象，并执行构造函数逻辑
  const result = constructor.apply(obj, args);

  // 在JavaScript构造函数中：如果return值类型，那么对构造函数没有影响，实例化对象返回空对象；如果return引用类型（数组，函数，对象），那么实例化对象就会返回该引用类型; 
  return typeof result === "object" && result !== null ? result : obj;
}

function testFunc() {
  console.log(this);
  return 1;
}

testFunc.prototype.test = function () {
  console.log("test func prototype");
};

// newFunc(testFunc)
// console.log('newFunc(testFunc): ', newFunc(testFunc));
// console.log("newFunc(testFunc): ", newFunc(testFunc).test());
