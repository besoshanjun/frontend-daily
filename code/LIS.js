// 最大上升子序列

const data = [3, 5, 7, 1, 2, 8];

const lengthOfLIS = (nums) => {
  if (!nums.length) return 0;

  const dp = Array(nums.length).fill(1);

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  console.log('dp: ', dp);
  return dp;
};

lengthOfLIS(data);
