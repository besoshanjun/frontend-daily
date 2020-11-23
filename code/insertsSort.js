// 1.插入排序
let arr = [0, 12, 43, 45, 88, 88, 1, 69]

const insertsSort = (array) => {
  let length = array.length;
  let current;
  let preIndex;

  for (let index = 0; index < length; index++) {
    preIndex = index - 1;
    current = array[index];
    
    while(preIndex >= 0 && array[preIndex] > current) {
      array[preIndex + 1] = array[preIndex]
      preIndex--;
    }
    array[preIndex + 1] = current;

  }

  return array
}

console.log('insertsSort', insertsSort(arr))