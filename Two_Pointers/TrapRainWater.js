/**
 * Computes how much water it can trap after raining.
 * @param {number[]} height - An array representing the elevation map where the width of each bar is 1.
 * @return {number} - The total amount of trapped water.
 */
function trap(height) {
  // Two pointers, one starting from the left and one from the right
  let left = 0;
  let right = height.length - 1;
  
  // Keep track of the maximum height seen so far from both sides
  let leftMax = 0;
  let rightMax = 0;
  
  let water = 0;
  
  while (left < right) {
    // Process the smaller height side first to ensure water can be trapped
    if (height[left] < height[right]) {
      // If current height is greater than or equal to leftMax, update leftMax
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        // Otherwise, water is trapped based on the difference
        water += leftMax - height[left];
      }
      left++;
    } else {
      // Similarly process the right side
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }
  return water;
}
