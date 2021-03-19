/**
 * proxy & Reflect
 * Proxy
 * new Proxy(target, handle)
 * handle 支持13种捕获器
 * 常用的有
 * get(): 属性读取操作
 * set(): 属性设置操作
 * deleteProperty(): delete 操作符的捕获器
 * ownKeys(): Object.getOwnPropertyNames 方法和Object.getOwnPropertySymbols方法的捕获器
 * has(): in 操作符的捕获器
 */
const man = {
  name: 'dhj'
}

const proxy = new Proxy(man, {
  get(target, property, receiver) {
    console.log(`正在访问${property}属性`);
    return target[property];
  }
})

console.log(proxy.name); // 正在访问name属性 -> dhj
console.log(proxy.age); // 正在访问age属性 -> undefined