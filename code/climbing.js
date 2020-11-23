// 爬楼梯总共有多少种方法 每次可以爬 1或2阶（类似斐波那契数列 ）

const climbing = (n) => {
  if (n < 3 && n >= 1) return 1;
  if (n === 3) return 2;

  return climbing(n - 1) + climbing(n - 3);
};

// console.log("climbing: ", climbing(5));

const find = (array) => {
  let count = 0;
  let result = null;

  for (let i = 0; i < array.length; i++) {
    if (count === 0) {
      console.log('count==0: ', i);
      result = array[i]
    };

    if (array[i] === result) {
      count++;
    } else {
      count--;
    }
    console.log('count: ', count, result);
  }

  return result;
};

console.log("find", find([0, 0, 1, 1, 1, 2, 2]));
