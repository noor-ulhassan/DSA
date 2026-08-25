/**
 * TRAPPING RAIN WATER
 * ---------------------------------------------------------------------
 * Problem: Given an elevation map where each bar has width 1, compute
 * how much rain water it can trap after raining.
 *
 * Key insight: the water sitting above any single bar i is bounded by
 * the SHORTER of the tallest wall to its left and the tallest wall to
 * its right: water[i] = min(leftMax, rightMax) - height[i] (never
 * negative). A naive solution precomputes leftMax[] and rightMax[]
 * arrays in two passes - O(n) time but O(n) extra space.
 *
 * Better approach (used here): two pointers closing in from both ends,
 * tracking leftMax and rightMax as running values instead of arrays.
 * At each step we only process the side with the SMALLER current
 * height. Why that's safe: whichever side is smaller, its own running
 * max is the true bottleneck for water above it - the far side is
 * guaranteed to already have a wall at least as tall (since we only
 * ever advance the shorter side), so we never need the far side's
 * exact max to compute water on the near side correctly.
 *
 * VISUAL WALKTHROUGH for height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * ---------------------------------------------------------------------
 *
 *   left=0,right=11: height[0]=0 < height[11]=1 -> process left
 *     0 >= leftMax(0) -> leftMax=0, no water. left=1
 *
 *   height[1]=1, height[11]=1 (tie goes right) -> process right
 *     1 >= rightMax(0) -> rightMax=1, no water. right=10
 *
 *   height[1]=1 < height[10]=2 -> process left
 *     1 >= leftMax(0) -> leftMax=1, no water. left=2
 *
 *   height[2]=0 < height[10]=2 -> process left
 *     0 < leftMax(1) -> traps 1-0 = 1 unit. water=1. left=3
 *
 *   ... pointers keep converging, each step either raising a running
 *   max or trapping (runningMax - currentHeight) on whichever side is
 *   currently shorter. Continuing the same way through the rest of the
 *   array adds 1 + 1 + 2 + 1 more units along the way.
 *
 *   final answer: water = 6
 *
 * Time:  O(n)  - left and right together cover the array once.
 * Space: O(1)  - only a few running values, no extra arrays.
 *
 * @param {number[]} height - Elevation map, one bar per index, width 1.
 * @return {number} - Total units of trapped water.
 */
function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      // left is the current bottleneck - safe to resolve it now
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left]; // wall on the left traps this much
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right]; // wall on the right traps this much
      }
      right--;
    }
  }
  return water;
}
