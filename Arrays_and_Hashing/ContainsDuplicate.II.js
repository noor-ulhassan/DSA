/**
 * CONTAINS DUPLICATE II
 * ---------------------------------------------------------------------
 * Problem: Given an array of numbers and an integer k, return true if
 * there are two EQUAL numbers whose indices are at most k apart
 * (i.e. there exist i, j with nums[i] === nums[j] and |i - j| <= k).
 * Unlike "Contains Duplicate", a repeat only counts if it's "nearby" -
 * a duplicate that's far away in the array doesn't count.
 *
 * This file shows two different ways to solve it. Because both are
 * declared with `function containsNearbyDuplicate(...)`, in JavaScript
 * the SECOND declaration overwrites the first (function declarations
 * get hoisted and the later one wins) - so only Approach 2 actually
 * runs if you call containsNearbyDuplicate. Approach 1 is kept here
 * for comparison/learning purposes.
 *
 * APPROACH 1 - Map of last-seen index
 * For each number, remember the most recent index where we saw it.
 * When we see that number again, check whether the gap since last
 * time (i - lastSeenIndex) is small enough (<= k). If yes, we found a
 * nearby duplicate. Otherwise, update the map with the newer, closer
 * index (an old, far-away occurrence is no longer useful to compare
 * against - only the most recent occurrence can produce the smallest
 * possible gap for future comparisons).
 *
 * APPROACH 2 - Sliding window of size k using a Set (used version)
 * Instead of tracking indices and doing math, keep a Set that only
 * ever contains the last k numbers seen - a "sliding window" over the
 * array. For each new number:
 *   1) If it's already in the window, it must be a duplicate within
 *      the last k elements - return true.
 *   2) Otherwise add it to the window.
 *   3) If the window has grown past size k, remove the number that
 *      just slid out of range (the one at index i - k) so the window
 *      always represents exactly "the last k numbers".
 * This way "is it in the set?" directly answers "is there an equal
 * number within k positions behind me?" without any index arithmetic.
 *
 * VISUAL WALKTHROUGH (Approach 2) for nums = [1, 2, 3, 1], k = 3
 * ---------------------------------------------------------------------
 *
 *   index:      0     1     2     3
 *   nums:    [  1  ,  2  ,  3  ,  1  ]
 *
 *   the window is a bracket holding "the last k numbers", sliding right:
 *
 *   i=0   ⟦ 1 ⟧  2    3    1        window={1}          not in it -> add
 *
 *   i=1     1  ⟦ 1    2 ⟧  3    1   window={1,2}         wait - window
 *          shown widening below as it fills toward size k:
 *          ⟦ 1    2 ⟧  3    1        (holds indices 0,1)  2 not in it -> add
 *
 *   i=2   ⟦ 1    2    3 ⟧  1        window={1,2,3}  size 3 == k, no evict
 *          (holds indices 0,1,2)                     3 not in it -> add
 *
 *   i=3     1  ⟦ 2    3    1 ⟧      check FIRST: is nums[3]=1 already
 *                                    in window {1,2,3}?  YES!
 *                                    -> return true
 *                                    (index 0's "1" is exactly k=3 behind)
 *
 *   If k were 2 instead, the "1" from index 0 would have already been
 *   evicted by the time i=3 arrives (window can't hold indices 0..3 at
 *   once when k=2), so the match would correctly be missed.
 *
 * Time:  O(n)  for both approaches - one pass, O(1) average map/set ops.
 * Space: O(min(n, k))  - the window/map never needs to hold more than
 *        k+1 relevant entries at once.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
function containsNearbyDuplicate(nums, k) {
  const lastSeen = new Map(); // number -> index where we last saw it

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (lastSeen.has(num) && i - lastSeen.get(num) <= k) {
      return true; // found the same number within k positions
    }

    lastSeen.set(num, i); // update to this closer, more recent index
  }

  return false;
}

// Approach 2: sliding window using a Set (this declaration wins - see note above)

function containsNearbyDuplicate(nums, k) {
  const window = new Set(); // holds only the last k numbers seen

  for (let i = 0; i < nums.length; i++) {
    if (window.has(nums[i])) return true; // duplicate within the current window

    window.add(nums[i]);

    if (window.size > k) {
      // Window grew past k - slide it forward by dropping the number
      // that has now fallen more than k positions behind index i.
      window.delete(nums[i - k]);
    }
  }
  return false;
}
