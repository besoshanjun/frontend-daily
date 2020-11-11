// call 实现

export default function call(context) {
  if(!context) {
    context = window;
  }
  let args = [...arguments].slice(1),
  result;

  result = context.fn(...args);
  delete context.fn;
  return result;
}