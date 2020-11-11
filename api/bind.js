// bind 实现
export default function bind (context) {
  if(typeof this !== 'function') {
    throw TypeError('Error')
  }
  let self = this;
  let args = [...arguments].slice(1);
  return function() {
    // 判断是否被当作构造函数使用
    if(this instanceof Function) {
      return self.apply(this, args.concat([...arguments]))
    }
    return self.apply(context, args.concat([...arguments]))
  }

}