/**
 * FIND FIRST AND LAST POSITION OF ELEMENT IN SORTED ARRAY
 * ---------------------------------------------------------------------
 * Problem: Given a sorted array `nums` and a `target`, return the
 * starting and ending index of `target` as [first, last]. If the
 * target isn't present, return [-1, -1]. Must run in O(log n).
 *
 * Approach: a plain binary search finds *some* occurrence of the
 * target but not necessarily the leftmost or rightmost one. So we run
 * binary search twice with a small twist: when we land on the target,
 * instead of returning, we record the index and keep searching one
 * side to see if an even earlier (or later) match exists.
 *   - findBound(..., isFirst = true):  on a hit, record it and move
 *     `right` left, forcing the search into the lower half to hunt for
 *     an earlier occurrence.
 *   - findBound(..., isFirst = false): on a hit, record it and move
 *     `left` right, hunting for a later occurrence.
 * The last index recorded before the window closes is the true bound.
 *
 * If the first search returns -1 the target isn't in the array at all,
 * so we skip the second search and return [-1, -1] immediately.
 *
 * VISUAL WALKTHROUGH for nums = [5, 7, 7, 8, 8, 8, 10], target = 8
 * ---------------------------------------------------------------------
 *
 *   findBound(isFirst = true)            indices: 0 1 2 3 4 5 6
 *     left=0 right=6 mid=3  nums[3]=8 == target
 *        record result=3, go left:  right = 2
 *     left=0 right=2 mid=1  nums[1]=7 < 8   ->  left = 2
 *     left=2 right=2 mid=2  nums[2]=7 < 8   ->  left = 3
 *     left=3 right=2  ->  window closed, return 3      (first = 3)
 *
 *   findBound(isFirst = false)
 *     left=0 right=6 mid=3  nums[3]=8 == target
 *        record result=3, go right:  left = 4
 *     left=4 right=6 mid=5  nums[5]=8 == target
 *        record result=5, go right:  left = 6
 *     left=6 right=6 mid=6  nums[6]=10 > 8  ->  right = 5
 *     left=6 right=5  ->  window closed, return 5      (last = 5)
 *
 *   answer: [3, 5]
 *
 * Time:  O(log n)  - two independent binary searches, each halving the
 *        search window every step.
 * Space: O(1)  - only index variables, no extra structures.
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const first = findBound(nums, target, true);

  if (first === -1) {
    return [-1, -1];
  }

  const last = findBound(nums, target, false);
  return [first, last];
};

function findBound(nums, target, isFirst) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      result = mid;
      if (isFirst) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}
