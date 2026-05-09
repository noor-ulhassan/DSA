/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  let n = nums.length;
  let answer = new Array(n);
  let prefix = 1;

  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix = prefix * nums[i];
  }

  let postfix = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] = answer[i] * postfix;
    postfix = postfix * nums[i];
  }

  return answer;
};
