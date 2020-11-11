// apply 实现

export default function apply(context) {
  if(!context) {
    context = window
  }
  context.fn = this;
  let args = arguments[1],
  result;
  if(args) {
    result  = context.fn(...args);
  } else {
    result = context.fn()
  }
  delete context.fn;
  return result;
}