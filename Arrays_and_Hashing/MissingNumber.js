/**
 * MISSING NUMBER
 * ---------------------------------------------------------------------
 * Problem: Given an array containing n distinct numbers taken from the
 * range [0, n], find the one number in that range missing from the
 * array. (The array has n elements, but the full range [0, n] has n+1
 * possible values, so exactly one is absent.)
 *
 * Brute-force idea: put every number in a Set and scan 0..n looking for
 * the one that's missing - works, but costs O(n) extra space.
 *
 * Better approach (used here): use the closed-form formula for the sum
 * of the first n natural numbers, sum(0..n) = n*(n+1)/2, to know what
 * the total SHOULD be if nothing were missing. Then sum the numbers
 * actually in the array. Whatever the expected sum is missing compared
 * to the actual sum is exactly the missing number - every OTHER value
 * in the range contributed equally to both sums, so they cancel out.
 *
 * VISUAL WALKTHROUGH for nums = [3, 0, 1]   (n = 3, range is [0, 3])
 * ---------------------------------------------------------------------
 *
 *   expectSum = n*(n+1)/2 = 3*4/2 = 6    (0+1+2+3 = 6)
 *
 *   actualSum = 3 + 0 + 1 = 4
 *
 *   missing = expectSum - actualSum = 6 - 4 = 2
 *
 *   check: range [0,1,2,3], array has {3,0,1} -> 2 is indeed absent
 *
 * Time:  O(n)  - one pass to sum the array.
 * Space: O(1)  - just two accumulators, no extra structures.
 *
 * @param {number[]} nums - The input array of distinct numbers
 * @return {number} - The missing number
 */
var missingNumber = function (nums) {
  const n = nums.length;
  const expectSum = (n * (n + 1)) / 2; // sum of 0..n if nothing were missing

  let actualSum = 0;
  for (let i = 0; i < n; i++) {
    actualSum += nums[i];
  }

  return expectSum - actualSum; // gap between expected and actual reveals the missing value
};
