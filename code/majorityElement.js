// 求众数

// 难度简单 找到出现次数在数组中出现的次数大于 n/2 的数
function find(array) {
  let count = 0;
  let cand1 = array[0];

  for (let index = 0; index < array.length; index++) {
    const current = array[index];
    if(current === cand1) {
      count++;
      continue;
    } else {
      count--;
    }

    if(count === 0) {
      cand1 = current;
      count++;
    }
    console.log('count: ', count, cand1);
  }
  return cand1;
}

// find([1,2,1])
console.log('find([1,2,1]): ', find([1,2,3,1,2]));


// 给定一个大小为 n 的整数数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。
// 示例 1：

// 输入：[3,2,3]
// 输出：[3]
// 示例 2：

// 输入：nums = [1]
// 输出：[1]
// 示例 3：

// 输入：[1,1,1,3,3,2,2,2]
// 输出：[1,2

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/majority-element-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

var majorityElement = function (nums) {
  let cand1 = nums[0],
    cand2 = nums[0];
  let count1 = 0,
    count2 = 0;
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    if (cand1 === nums[i]) {
      count1++;
      continue;
    } else if (cand2 === nums[i]) {
      count2++;
      continue;
    }

    if (count1 === 0) {
      cand1 = nums[i];
      count1++;
      continue;
    } else if (count2 === 0) {
      cand2 = nums[i];
      count2++;
      continue;
    }
    count1--;
    count2--;
  }

  count1 = count2 = 0;

  for (let index = 0; index < nums.length; index++) {
    const num = nums[index];
    if (num === cand1) {
      count1++;
    } else if (num === cand2) {
      count2++;
    }
  }

  if (count1 > nums.length / 3) {
    result.push(cand1);
  }

  if (count2 > nums.length / 3) {
    result.push(cand2);
  }

  return result;
};

// console.log("majorityElement([1]): ", majorityElement([1, 2]));

//2.
// 时间复杂度不稳定-但没符合要求：最高O（n^2-n/3）最好是O（n-n/3）
// 虽说lastindexof复杂度是n,但分情况nums.length 会随着众数个数而变化

function majorityElement2(nums) {
  let len = nums.length / 3;
  nums.sort((a, b) => a - b);
  let res = [];
  while (nums.length > len) {
    let a = nums.lastIndexOf(nums[0]);
    if (a + 1 > len) {
      res.push(nums[0]);
    }
    nums.splice(0, a + 1);
  }
  
  return res;
}

console.log("majorityElement2: ", majorityElement2([1,1,1,3,3,2,2,2]));

