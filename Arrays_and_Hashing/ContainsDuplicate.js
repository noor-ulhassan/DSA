/**
 * CONTAINS DUPLICATE
 * ---------------------------------------------------------------------
 * Problem: Given an array of numbers, return true if any value appears
 * at least twice, and false if every element is distinct.
 *
 * Brute-force idea: compare every pair of numbers - O(n^2), too slow
 * for large inputs. Sorting first and checking neighbors is O(n log n).
 *
 * Best approach (used here): use a Set, which is a collection that
 * only stores unique values and offers O(1) average "have I seen
 * this?" lookups. Walk through the array once:
 *   - if the current number is already in the set, we've found a
 *     duplicate - return true immediately.
 *   - otherwise, record the number in the set and keep going.
 * If we make it through the whole array without ever finding a repeat,
 * every value must have been unique - return false.
 *
 * VISUAL WALKTHROUGH for nums = [1, 2, 3, 1]
 * ---------------------------------------------------------------------
 *
 *   index:     0     1     2     3
 *   nums:   [  1  ,  2  ,  3  ,  1  ]
 *
 *   i=0  num=1   seen: {}              -> not in seen -> add -> {1}
 *        [ 1 ]  2   3   1
 *          ▲
 *   i=1  num=2   seen: {1}             -> not in seen -> add -> {1,2}
 *          1  [ 2 ]  3   1
 *                ▲
 *   i=2  num=3   seen: {1,2}           -> not in seen -> add -> {1,2,3}
 *          1   2  [ 3 ]  1
 *                    ▲
 *   i=3  num=1   seen: {1,2,3}         -> 1 IS in seen! -> return true
 *          1   2   3  [ 1 ]
 *                        ▲              ╲
 *                                        ╲___ matches the 1 recorded at i=0
 *
 *   If instead nums = [1,2,3,4], the set would just keep growing with
 *   no hit ever occurring, and we'd fall through to `return false`.
 *
 * Time:  O(n)  - one pass, O(1) average Set operations.
 * Space: O(n)  - worst case (no duplicates) the set holds every element.
 *
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  const seen = new Set(); // numbers we've encountered so far
  for (const num of nums) {
    if (seen.has(num)) {
      return true; // we've seen this number before - duplicate found
    }
    seen.add(num);
  }

  return false; // walked through everything, no repeats found
};
