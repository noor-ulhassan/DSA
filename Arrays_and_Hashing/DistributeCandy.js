/**
 * DISTRIBUTE CANDIES
 * ---------------------------------------------------------------------
 * Problem: `candyType[i]` is the type of the i-th candy. There are an
 * even number of candies, and a doctor says the person may eat only
 * n / 2 of them. Return the maximum number of DIFFERENT types they can
 * eat while staying within that limit.
 *
 * Approach: two independent caps decide the answer:
 *   - the number of distinct types available (put candyType in a Set
 *     and take its size) - can't eat more variety than exists.
 *   - the eating limit n / 2 - can't eat more candies than allowed, and
 *     each new type costs at least one candy.
 * The answer is simply the smaller of the two:
 *   min(distinctTypes, n / 2).
 * If there are at least n / 2 distinct types, every bite can be a new
 * type and the limit binds; otherwise variety binds.
 *
 * VISUAL WALKTHROUGH for candyType = [1, 1, 2, 2, 3, 3]
 * ---------------------------------------------------------------------
 *
 *   Set(candyType) = {1, 2, 3}   -> unique.size = 3
 *   allowed = 6 / 2 = 3
 *   min(3, 3) = 3        (can eat one of each type)
 *
 *   for candyType = [1, 1, 1, 1, 2, 2]:
 *   unique.size = 2   allowed = 3   -> min(2, 3) = 2
 *
 * Time:  O(n)  - building the Set scans the array once.
 * Space: O(n)  - the Set holds up to n distinct values.
 *
 * @param {number[]} candyType
 * @return {number}
 */
var distributeCandies = function (candyType) {
  let unique = new Set(candyType);
  let allowed = candyType.length / 2;

  return Math.min(unique.size, allowed);
};
