/**
 * SORT COLORS (DUTCH NATIONAL FLAG)
 * ---------------------------------------------------------------------
 * Problem: Given an array nums containing only 0s, 1s, and 2s, sort it
 * in-place so all 0s come first, then all 1s, then all 2s. Must be done
 * in one pass without using a library sort (which would be O(n log n)
 * for a problem that only has 3 distinct values, so counting sort or a
 * single linear pass is the intended, more efficient solution).
 *
 * Approach: three pointers partition the array into four regions as
 * `mid` sweeps left to right:
 *   [0, left)        already-placed 0s
 *   [left, mid)       already-placed 1s
 *   [mid, right]      unknown, not yet looked at
 *   (right, end]      already-placed 2s
 *
 * At each step, look at nums[mid]:
 *   - if it's 0: swap it with nums[left] (moving a 0 into the 0-region),
 *     then advance both left and mid - the value that came from `left`
 *     is guaranteed to be a 1 (or the same 0), so it's already correctly
 *     classified and safe to move past.
 *   - if it's 1: it's already in the right region - just advance mid.
 *   - if it's 2: swap it with nums[right] (moving a 2 into the 2-region),
 *     then shrink right. mid does NOT advance here, because the value
 *     swapped in from `right` hasn't been inspected yet.
 *
 * VISUAL WALKTHROUGH for nums = [2, 0, 2, 1, 1, 0]
 * ---------------------------------------------------------------------
 *
 *   left=0 mid=0 right=5   [ 2, 0, 2, 1, 1, 0 ]
 *   nums[mid]=2 -> swap mid<->right, right--
 *                  [ 0, 0, 2, 1, 1, 2 ]   left=0 mid=0 right=4
 *
 *   nums[mid]=0 -> swap mid<->left, left++, mid++
 *                  [ 0, 0, 2, 1, 1, 2 ]   left=1 mid=1 right=4
 *
 *   nums[mid]=0 -> swap mid<->left, left++, mid++
 *                  [ 0, 0, 2, 1, 1, 2 ]   left=2 mid=2 right=4
 *
 *   nums[mid]=2 -> swap mid<->right, right--
 *                  [ 0, 0, 1, 1, 2, 2 ]   left=2 mid=2 right=3
 *
 *   nums[mid]=1 -> just mid++
 *                  left=2 mid=3 right=3
 *
 *   nums[mid]=1 -> just mid++
 *                  left=2 mid=4 right=3   mid > right -> stop
 *
 *   final: [ 0, 0, 1, 1, 2, 2 ]   sorted!
 *
 * Time:  O(n)  - `mid` sweeps the array once; `right` only ever moves
 *        left, so no index is revisited more than a constant number of
 *        times.
 * Space: O(1)  - sorted in place with three pointers, no extra arrays.
 *
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let left = 0; // next slot to place a 0
  let mid = 0; // current element being classified
  let right = nums.length - 1; // next slot to place a 2

  while (mid <= right) {
    if (nums[mid] === 0) {
      [nums[left], nums[mid]] = [nums[mid], nums[left]];
      left++;
      mid++;
    } else if (nums[mid] == 1) {
      mid++;
    } else {
      [nums[mid], nums[right]] = [nums[right], nums[mid]];
      right--;
    }
  }
};
