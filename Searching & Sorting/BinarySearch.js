/**
 * BINARY SEARCH
 * ---------------------------------------------------------------------
 * Problem: Given a sorted (ascending) array `nums` and a `target`,
 * return the index of `target`, or -1 if it isn't present. Must run in
 * O(log n).
 *
 * Approach: keep a search window [left, right] that is guaranteed to
 * contain the target if it exists. Look at the middle element:
 *   - if it equals the target, we're done.
 *   - if it's smaller than the target, the target can only be to the
 *     right, so discard the left half: left = mid + 1.
 *   - if it's larger, discard the right half: right = mid - 1.
 * Each step halves the window, so it collapses in ~log2(n) iterations.
 * When left passes right the window is empty and the target is absent.
 *
 * The `left <= right` guard (not `<`) matters: it lets the window
 * shrink to a single element and still check it.
 *
 * VISUAL WALKTHROUGH for nums = [-1, 0, 3, 5, 9, 12], target = 9
 * ---------------------------------------------------------------------
 *
 *   indices:  0   1   2   3   4   5
 *            -1   0   3   5   9  12
 *
 *   left=0 right=5  mid=2  nums[2]=3  < 9   -> left = 3
 *   left=3 right=5  mid=4  nums[4]=9  == 9  -> return 4
 *
 *   (searching for 2 instead would end with left > right -> return -1)
 *
 * Time:  O(log n)  - the window is halved every iteration.
 * Space: O(1)  - only three index variables.
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
};
