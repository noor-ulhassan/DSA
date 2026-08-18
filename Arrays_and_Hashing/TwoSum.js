/**
 * TWO SUM
 * ---------------------------------------------------------------------
 * Problem: Given an array of numbers and a target, find the indices of
 * the two numbers that add up to the target. Assume exactly one answer.
 *
 * Brute-force idea: check every pair of numbers (nested loop) and see
 * if they add up to target. That works but costs O(n^2) time, because
 * for every number we re-scan the whole array looking for its partner.
 *
 * Better idea (used here): instead of searching for the partner, keep
 * a record of numbers we've ALREADY seen, so we can look one up
 * instantly instead of re-scanning.
 *
 * A Map (hash map) gives us that instant lookup. It stores
 *   number -> index where we saw it
 * Checking "have I seen X?" and reading its index are both O(1).
 *
 * VISUAL WALKTHROUGH for nums = [2, 7, 11, 15], target = 9
 * ---------------------------------------------------------------------
 *
 *   index:     0     1     2     3
 *   nums:   [  2  ,  7  ,  11 ,  15 ]
 *
 *   i=0  current=2   needed = 9-2 = 7
 *        [ 2 ]  7   11   15
 *          ▲
 *        look up "7" in map {}  ->  not found ✗
 *        map.set(2 -> 0)              map: { 2:0 }
 *
 *   i=1  current=7   needed = 9-7 = 2
 *          2   [ 7 ]  11   15
 *                ▲
 *        look up "2" in map { 2:0 }  ->  FOUND at index 0 ✓
 *        return [0, 1]   <-- the indices of 2 and 7
 *
 *   map grows left-to-right as a running memory of numbers seen so far:
 *     {} -> { 2:0 } -> match found, stop
 *
 * Notice we check "do I have the needed partner?" BEFORE adding the
 * current number to the map. That's what stops a number from ever
 * pairing with itself (e.g. target=4, nums=[2,...] wouldn't let the
 * first 2 match itself before a second 2 shows up).
 *
 * Time:  O(n)  - one pass through the array, O(1) map operations.
 * Space: O(n)  - the map can hold up to n entries.
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const map = new Map(); // number -> index we last saw it at
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const needed = target - current; // the value that would complete the pair
    if (map.has(needed)) {
      // We've already seen the number that completes this pair.
      return [map.get(needed), i];
    }
    map.set(current, i); // remember this number for future lookups
  }
};
