/**
 * FIRST MISSING POSITIVE
 * ---------------------------------------------------------------------
 * Problem: Given an unsorted array of integers, find the smallest
 * missing positive integer. Must run in O(n) time using O(1) extra
 * space, so sorting first or using a Set/hash map doesn't count as
 * the intended solution.
 *
 * Step 1 - the key insight: if the array has n elements, the answer
 * must be somewhere in the range [1, n+1]. There's no way it can be
 * bigger than n+1, because that would require every number 1..n to
 * already be present, in which case n+1 IS the answer.
 *
 * Step 2 - cyclic sort (in-place placement). Because the answer is
 * bounded by n, we can use the array itself as a hash table: place
 * each value v (where 1 <= v <= n) at index v-1. Walk the array and,
 * whenever nums[i] belongs somewhere else (in range, and not already
 * sitting in its correct slot), swap it into place. Keep swapping at
 * index i until the value landing there is either out of range or
 * already correct - this is what makes each element move at most
 * once into its final resting spot, keeping the whole pass O(n).
 *
 * Step 3 - once every in-range value sits at its correct index, scan
 * left to right: the first index i where nums[i] !== i+1 reveals the
 * missing positive (i+1). If every slot matches, nothing was missing
 * and the answer is n+1.
 *
 * VISUAL WALKTHROUGH for nums = [3, 4, -1, 1]
 * ---------------------------------------------------------------------
 *
 *   n = 4, so the answer must be in [1, 5].
 *
 *   i=0: nums[0]=3 -> belongs at index 2. nums[2]=-1 !== 3 -> swap.
 *        [3, 4, -1, 1] -> [-1, 4, 3, 1]
 *        nums[0] is now -1 (out of range) -> stop swapping at i=0.
 *
 *   i=1: nums[1]=4 -> belongs at index 3. nums[3]=1 !== 4 -> swap.
 *        [-1, 4, 3, 1] -> [-1, 1, 3, 4]
 *        nums[1] is now 1 -> belongs at index 0. nums[0]=-1 !== 1 -> swap.
 *        [-1, 1, 3, 4] -> [1, -1, 3, 4]
 *        nums[1] is now -1 (out of range) -> stop swapping at i=1.
 *
 *   i=2: nums[2]=3 -> belongs at index 2, and it's already there -> skip.
 *   i=3: nums[3]=4 -> belongs at index 3, and it's already there -> skip.
 *
 *   final array: [1, -1, 3, 4]
 *
 *   scan for the first mismatch:
 *     index 0: nums[0]=1 === 0+1 -> ok
 *     index 1: nums[1]=-1 !== 1+1(=2) -> MISMATCH -> return 2
 *
 *   answer: 2  (1 is present, 2 is the smallest missing positive)
 *
 * Time:  O(n)  - each value is swapped into its correct slot at most
 *        once across the whole first loop, so the total work across
 *        both passes is linear.
 * Space: O(1)  - values are rearranged in place; no extra structures.
 */
function firstMissingPositive(nums) {
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      // nums[i] belongs at index nums[i]-1 and isn't there yet - swap it in
      const target = nums[i] - 1;
      [nums[i], nums[target]] = [nums[target], nums[i]];
    }
  }

  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1; // first slot that doesn't hold its own index+1 -> the gap
    }
  }

  return n + 1; // every slot 1..n was filled correctly - nothing missing below n+1
}
