/**
 * HAPPY NUMBER
 * ---------------------------------------------------------------------
 * Problem: A number is "happy" if repeatedly replacing it with the sum
 * of the squares of its digits eventually reaches 1. If instead the
 * process enters a cycle that never includes 1, the number is not
 * happy. Determine whether a given number n is happy.
 *
 * Key insight: this is a cycle-detection problem in disguise. Repeatedly
 * applying sumOfSquares(n) is really just walking a chain of numbers,
 * and it's a known fact that this chain either reaches 1 or falls into
 * one specific repeating loop - it never grows forever. So the question
 * becomes "does this chain hit 1 before it repeats a value?".
 *
 * Approach used here: keep a Set of every value seen so far. Each step,
 * if the current number is already in the set, we've detected a cycle
 * that doesn't include 1 (since we check n === 1 before that), so it's
 * not happy. Otherwise, record it and move to the next value in the
 * chain. The loop stops the moment n becomes 1 (happy) or a repeat is
 * found (not happy).
 *
 * VISUAL WALKTHROUGH for n = 19
 * ---------------------------------------------------------------------
 *
 *   seen = {}
 *
 *   n=19  not 1, not seen -> seen={19}
 *         sumOfSquares(19) = 1^2 + 9^2 = 1 + 81 = 82
 *
 *   n=82  not 1, not seen -> seen={19,82}
 *         sumOfSquares(82) = 8^2 + 2^2 = 64 + 4 = 68
 *
 *   n=68  not 1, not seen -> seen={19,82,68}
 *         sumOfSquares(68) = 6^2 + 8^2 = 36 + 64 = 100
 *
 *   n=100 not 1, not seen -> seen={19,82,68,100}
 *         sumOfSquares(100) = 1^2 + 0^2 + 0^2 = 1
 *
 *   n=1   loop condition (n !== 1) is now false -> stop
 *
 *   return n === 1 -> true, 19 is happy
 *
 *   A non-happy number (e.g. 2) would instead eventually land back on
 *   a value already recorded in `seen`, and the loop would stop there
 *   with n still not equal to 1 -> return false.
 *
 * Time:  O(log n)  per digit-square-sum step, and the chain provably
 *        reaches 1 or a cycle within a small, bounded number of steps.
 * Space: O(log n)  for the set of numbers seen along the chain.
 *
 * @param {number} n - The number to check
 * @return {boolean} - True if it's a happy number, false otherwise
 */
var isHappy = function (n) {
  const seen = new Set(); // numbers already visited in the chain

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = sumOfSquares(n);
  }

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
    const digit = num % 10;
    sum += digit * digit;
    num = Math.floor(num / 10);
  }
  return sum;
}
