/**
 * Finds the missing number in an array containing n distinct numbers taken from 0, 1, 2, ..., n.
 * Uses the mathematical formula for the sum of the first n natural numbers to find the missing value.
 * @param {number[]} nums - The input array of distinct numbers
 * @return {number} - The missing number
 */
var missingNumber = function (nums) {
  const n = nums.length;
  // Calculate the expected sum of numbers from 0 to n using the formula n * (n + 1) / 2
  const expectSum = (n * (n + 1)) / 2;
  
  let actualSum = 0;
  // Calculate the actual sum of the elements in the array
  for (let i = 0; i < n; i++) {
    actualSum += nums[i];
  }
  
  // The difference between the expected sum and the actual sum is the missing number
  return expectSum - actualSum;
};
