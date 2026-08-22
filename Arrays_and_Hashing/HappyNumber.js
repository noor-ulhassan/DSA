/**
 * Determines if a number is a happy number.
 * A happy number is a number defined by the following process:
 * Starting with any positive integer, replace the number by the sum of the squares of its digits.
 * Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
 * @param {number} n - The number to check
 * @return {boolean} - True if it's a happy number, false otherwise
 */
var isHappy = function (n) {
  // Use a set to keep track of seen numbers to detect cycles
  const seen = new Set();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    // Calculate the sum of squares of the digits for the next iteration
    n = sumOfSquares(n);
  }
  // If we exit the loop and n is 1, it's a happy number
  return n === 1;
};

/**
 * Helper function to calculate the sum of the squares of the digits of a number.
 * @param {number} num - The input number
 * @return {number} - The sum of squares of its digits
 */
function sumOfSquares(num) {
  let sum = 0;
  while (num > 0) {
    // Extract the last digit
    const digit = num % 10;
    // Add its square to the sum
    sum += digit * digit;
    // Remove the last digit from the number
    num = Math.floor(num / 10);
  }
  return sum;
}
