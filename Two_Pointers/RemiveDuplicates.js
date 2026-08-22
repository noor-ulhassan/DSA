/**
 * Removes duplicates from a sorted array in-place such that each unique element appears only once.
 * The relative order of the elements should be kept the same.
 * @param {number[]} nums - The sorted array
 * @return {number} - The number of unique elements
 */
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  
  // 'slow' keeps track of the index of the last unique element found
  let slow = 0;
  
  // 'fast' iterates through the array to find new unique elements
  for (let fast = 1; fast < nums.length; fast++) {
    // When a new unique element is found
    if (nums[slow] !== nums[fast]) {
      slow++; // Move the slow pointer forward
      nums[slow] = nums[fast]; // Update the element at the slow pointer
    }
  }
  
  // The number of unique elements is the index of the last unique element + 1
  return slow + 1;
}
