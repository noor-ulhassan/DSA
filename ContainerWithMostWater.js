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
