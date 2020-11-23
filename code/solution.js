// 交换星号 一个字符串中只包含 * 和数字，请把 * 号都放开头。

// 判断是否是数字
const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

let string = "3*1*2******12312334*";

const solution = (string) => {
  let length = string.length;
  let a = string.split("");

  // 记录数字当前的位置
  let j = length - 1;

  for (let i = length - 1; i >= 0; i--) {
    if (isNumeric(a[i])) {
      a[j--] = a[i];
    }
  }

  for (; j >= 0; j--) {
    a[j] = "*";
  }
  return a.join("");
};

console.log("solution: ", solution(string));
