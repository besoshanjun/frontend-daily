/**
 * @description 获取最长子字符串的长度
 */
let string = "abbcabcd";

const lengthOfLongestSubstring = (str) => {
  let result = 0;
  let len = str.length;

  // 记录当前区间内出现的字符
  let mapping = {};

  for (let i = 0, j = 0; ; ++i) {

    // j 右移的过程
    while (j < len && !mapping[str[j]]) {
      mapping[str[j++]] = true;
    }

    result = Math.max(result, j - i);

    if (j >= len) {
      break;
    }
    // 出现了重复字符，i 开始进行右移的过程，同时将移出的字符在 mapping 中重置
    while (str[i] !== str[j]) {
      mapping[str[i++]] = false;
    }
    mapping[str[i]] = false;
    console.log('next')
  }

  return result;
};

console.log('lengthOfLongestSubstring: ', lengthOfLongestSubstring(string));

