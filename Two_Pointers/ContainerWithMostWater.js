/**
 * CONTAINER WITH MOST WATER
 * ---------------------------------------------------------------------
 * Problem: Given an integer array height of length n. There are n vertical
 * lines drawn such that the two endpoints of the ith line are (i, 0) and
 * (i, height[i]). Find two lines that together with the x-axis form a container,
 * such that the container contains the most water.
 * Return the maximum amount of water a container can store.
 *
 * Best approach (used here): Two Pointers.
 * We start with pointers at both ends of the array, maximizing the width.
 * The area is limited by the shorter line, so `area = width * min(left, right)`.
 * To try and find a larger area, we must increase the height, so we move
 * the pointer that is pointing to the shorter line inward.
 * 
 * VISUAL WALKTHROUGH for height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
 * ---------------------------------------------------------------------
 * 
 *   [ 1,  8,  6,  2,  5,  4,  8,  3,  7 ]
 *     ▲                               ▲
 *    L=0                             R=8
 * 
 *   Width = 8 - 0 = 8. Height = min(1, 7) = 1. Area = 8 * 1 = 8.
 *   maxWater = 8.
 *   Move left pointer inward because height[L] < height[R] (1 < 7).
 * 
 *   [ 1,  8,  6,  2,  5,  4,  8,  3,  7 ]
 *         ▲                           ▲
 *        L=1                         R=8
 * 
 *   Width = 8 - 1 = 7. Height = min(8, 7) = 7. Area = 7 * 7 = 49.
 *   maxWater = 49.
 *   Move right pointer inward because height[L] > height[R] (8 > 7).
 * 
 *   [ 1,  8,  6,  2,  5,  4,  8,  3,  7 ]
 *         ▲                       ▲
 *        L=1                     R=7
 * 
 *   Width = 7 - 1 = 6. Height = min(8, 3) = 3. Area = 6 * 3 = 18.
 *   maxWater is still 49.
 *   Move right pointer inward because height[R] < height[L].
 * 
 *   ... We continue this until L >= R.
 * 
 * Time:  O(n) - one pass through the array.
 * Space: O(1) - only uses two pointers and a few variables.
 *
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;
  while (left < right) {
    const width = right - left;
    const shorter = Math.min(height[left], height[right]);
    const area = width * shorter;
    maxWater = Math.max(maxWater, area);
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxWater;
}
