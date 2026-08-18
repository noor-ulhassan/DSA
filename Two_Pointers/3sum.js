/**
 * 3SUM
 * ---------------------------------------------------------------------
 * Problem: Given an integer array nums, return all the triplets
 * [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k,
 * and nums[i] + nums[j] + nums[k] == 0.
 *
 * Notice that the solution set must not contain duplicate triplets.
 *
 * Best approach (used here): Sort the array first. This allows us to
 * avoid duplicates easily and use the two-pointer technique.
 * We iterate through the array, treating each number as a potential
 * first element `nums[i]`. For each `nums[i]`, we use two pointers
 * (`left` and `right`) to find the other two numbers that sum to `-nums[i]`.
 * 
 * VISUAL WALKTHROUGH for nums = [-1, 0, 1, 2, -1, -4]
 * ---------------------------------------------------------------------
 * 
 *   Sorted nums: [-4, -1, -1, 0, 1, 2]
 * 
 *   i=0  nums[i] = -4   Target for left+right = 4
 *        [ -4 ] -1   -1    0    1    2
 *                ▲                   ▲
 *               left               right
 *        sum: -1 + 2 = 1 < 4  ->  left++
 *        ... eventually right <= left, no pairs found for -4
 * 
 *   i=1  nums[i] = -1   Target for left+right = 1
 *        -4   [ -1 ] -1    0    1    2
 *                     ▲              ▲
 *                    left          right
 *        sum: -1 + 2 = 1 == Target! 
 *        Found: [-1, -1, 2] -> add to result
 *        Advance both left and right, skipping duplicates.
 *        ... next left is at 0, right is at 1. sum: 0 + 1 = 1 == Target!
 *        Found: [-1, 0, 1] -> add to result.
 * 
 *   i=2  nums[i] = -1   (Skip! Same as previous i=1)
 * 
 * Time:  O(n^2) - O(n log n) for sorting, plus O(n^2) for the nested loops.
 * Space: O(1) or O(n) depending on the sorting algorithm implementation.
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}
