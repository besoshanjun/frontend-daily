// 1.插入排序
let arr = [12, 0, 43, 45, 88, 89, 1, 69];

const insertsSort = (array) => {
  let length = array.length;
  let current;
  let preIndex;

  for (let index = 0; index < length; index++) {
    preIndex = index - 1;
    current = array[index];

    while (preIndex >= 0 && array[preIndex] > current) {
      array[preIndex + 1] = array[preIndex];
      preIndex--;
    }
    array[preIndex + 1] = current;
  }

  return array;
};

console.log('insertsSort', insertsSort(arr))

var insert = (arr) => {
  // let length = arr.length;
  // let preIndex;
  // let current;

  // for (let i = 0; i < length; i++) {
  //   current = arr[i];
  //   preIndex = i - 1;
  //   while(preIndex >= 0 && arr[preIndex] > current) {
  //     arr[preIndex + 1] = arr[preIndex];
  //     preIndex--;
  //   }
  //   arr[preIndex + 1] = current
  // }
  // return arr
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    let j = i;
    for (; j > 0; j--) {
      if (current >= arr[j - 1]) {
        break;
      }
      arr[j] = arr[j - 1];
    }
    arr[j] = current;
  }
  return arr
};
// console.log("insert: ", insert(arr));
