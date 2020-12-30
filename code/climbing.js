// 爬楼梯总共有多少种方法 每次可以爬 1或2阶（类似斐波那契数列 ）
const climbing = (n) => {
  if (n === 1) return 1;
  if (n === 2) return 2;

  return climbing(n - 1) + climbing(n - 2);
};

// console.log("climbing: ", climbing(5));

// 投票
const find = (array) => {
  let count = 0;
  let result = null;

  for (let i = 0; i < array.length; i++) {
    if (count === 0) {
      result = array[i]
    };

    if (array[i] === result) {
      count++;
    } else {
      count--;
    }
  }

  return result;
};

console.log("find", find([0, 0, 1, 1, 1, 2, 2]));
