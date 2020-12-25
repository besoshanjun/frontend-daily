// 快排实现

let arr = [0, 88, 69, 45, 12, 1, 43]

//1.
const quickSort = (array = []) => {
  if (array.length < 2) {
    return array;
  }

  // 随机找到一个中间点
  const pivot = array.splice([Math.floor(Math.random() * array.length)], 1);

  let leftArry = [];
  let rightArry = [];
  
  for (let index = 0; index < array.length; index++) {
    const currentItem = array[index];
    if (currentItem <= pivot) {
      leftArry.push(currentItem);
    }else {
      rightArry.push(currentItem);
    }
  }

  return quickSort(leftArry).concat(pivot, quickSort(rightArry));
};

console.log('quickSort1', quickSort(arr));


//2.在原数组上操作，减少内存开销
const quickSort2 = (array, start, end) => {
  start = start === undefined ? 0 : start
  end = end === undefined ? array.length - 1 : end;

  if (start >= end) {
    return
  }

  let value = array[start]

  let i = start
  let j = end

  while (i < j) {
    // 找出右边第一个小于参照数的下标并记录
    while (i < j && array[j] >= value) {
      j--
    }

    if (i < j) {
      array[i++] = array[j]
    }

    // 找出左边第一个大于参照数的下标，并记录
    while (i < j && array[i] < value) {
      i++
    }

    if (i < j) {
      array[j--] = array[i]
    }
  }

  array[i] = value

  quickSort2(array, start, i - 1)
  quickSort2(array, i + 1, end)
}


// quickSort2(arr, 0, arr.length - 1)
// console.log('quickSort2', arr)
