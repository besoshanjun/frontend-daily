// 二维数组全排列
const arr = [
  ["A", "B"],
  ["a", "b"],
  [1, 2],
];

const findAll = (array) => {
  if (array.length === 1) {
    return array[0];
  }
  const temp = array.shift();
  return array.reduce((p, n) => {
    return getResult(p, n);
  }, temp);
};

const getResult = (arrA, arrB) => {
  if (arrA.length === 0) {
    return arrB;
  }

  if (arrB.length === 0) {
    return arrA;
  }
  const temp = [];
  for (let i = 0; i < arrA.length; i++) {
    const a = String(arrA[i]);
    for (let j = 0; j < arrB.length; j++) {
      const b = arrB[j];
      temp.push(a + b);
    }
  }

  return temp;
};

// console.log("findAll", findAll(arr));

const arrange = (list, pointer, preResult) => {
  if(pointer === list.length) {
    console.log(preResult);
    return;
  }
  for(let i = 0; i < list[pointer].length; i++) {
    arrange(list, pointer + 1, preResult + list[pointer][i])
  }
}
// arrange(arr, 0, '');
console.log('arrange', arrange(arr, 0, ''));

// 1234，全排列
const str = "123";

const sortAll = (str) => {
  const result = [];
  if (str.length === 1) {
    return [str];
  } else {
    const preStr = sortAll(str.slice(1));
    for (let i = 0; i < preStr.length; i++) {
      for (let j = 0; j < preStr.length + 1; j++) {
        const temp = preStr[i].slice(0, j) + str[0] + preStr[i].slice(j);
        result.push(temp);
      }
    }
    return [...new Set(result)];
  }
};

console.log('sortAll', sortAll(str))

