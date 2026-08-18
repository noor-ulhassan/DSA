/**
 * MERGE SORTED ARRAY
 * ---------------------------------------------------------------------
 * Problem: nums1 and nums2 are both sorted ascending. nums1 has extra
 * trailing space (its real length is m, but the array itself has room
 * for m + n elements, padded with zeros at the end). Merge nums2 into
 * nums1 in-place so nums1 ends up as one sorted array of length m + n.
 *
 * Naive approach: merge from the FRONT like a textbook merge-sort
 * merge step. Problem: nums1's real data occupies indices 0..m-1, and
 * writing a merged value into, say, index 0 could overwrite a number
 * we still need to compare later - we'd have to shift things around,
 * costing extra time/space.
 *
 * Better approach (used here): merge from the BACK instead.
 * Since nums1 has empty (padding) slots at the end, we can safely
 * place the largest remaining value into the last empty slot without
 * ever overwriting data we haven't looked at yet - by the time a
 * slot gets overwritten, we've already read the value that used to
 * live there.
 *
 * Three pointers:
 *   p1 -> last real (non-padding) element of nums1 (index m-1)
 *   p2 -> last element of nums2 (index n-1)
 *   p  -> last index of the merged array (index m+n-1), where the
 *         next (largest remaining) value gets written
 *
 * At each step we compare nums1[p1] and nums2[p2], copy whichever is
 * BIGGER into position p (since we're filling from the back, the
 * biggest numbers belong at the end), and move that pointer + p
 * backward.
 *
 * Once p2 < 0, nums2 is fully placed and we're done - any values left
 * in nums1's front (p1 >= 0) are already sitting in their correct
 * sorted position from the very start, so nothing more to do.
 * But if p1 < 0 first (nums1 ran out before nums2), we still need to
 * copy nums2's remaining smaller values into the front of nums1 -
 * that's what the second while loop handles.
 *
 * VISUAL WALKTHROUGH for nums1=[1,2,3,0,0,0] (m=3), nums2=[2,5,6] (n=3)
 * ---------------------------------------------------------------------
 *
 *   nums1:  [ 1 , 2 , 3 , _ , _ , _ ]     nums2:  [ 2 , 5 , 6 ]
 *   index:    0   1   2   3   4   5                 0   1   2
 *   start:            p1↑           ↑p                     p2↑
 *
 *   compare nums1[p1]=3 vs nums2[p2]=6  ->  6 wins (bigger)
 *     nums1: [ 1 , 2 , 3 , _ , _ , 6 ]      p2-- p--
 *                     p1↑         ↑p                    p2↑
 *
 *   compare nums1[p1]=3 vs nums2[p2]=5  ->  5 wins
 *     nums1: [ 1 , 2 , 3 , _ , 5 , 6 ]      p2-- p--
 *                     p1↑     ↑p                     p2↑
 *
 *   compare nums1[p1]=3 vs nums2[p2]=2  ->  3 wins
 *     nums1: [ 1 , 2 , 3 , 3 , 5 , 6 ]      p1-- p--
 *                 p1↑ ↑p                        p2↑
 *
 *   compare nums1[p1]=2 vs nums2[p2]=2  ->  tie, take nums2's copy
 *     nums1: [ 1 , 2 , 2 , 3 , 5 , 6 ]      p2-- p--
 *             p1↑,p↑                    p2 = -1 -> loop ends
 *
 *   final:  nums1 = [ 1 , 2 , 2 , 3 , 5 , 6 ]   ✓ merged & sorted
 *
 *   Why it's safe: we always fill the RIGHTMOST untouched slot with the
 *   CURRENT largest remaining candidate, so a slot is only ever
 *   overwritten after its old value has already been read and used.
 *
 * Time:  O(m + n)  - each element is placed exactly once.
 * Space: O(1)      - merged entirely in-place, no extra array.
 *
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let p1 = m - 1; // pointer to last real element in nums1
  let p2 = n - 1; // pointer to last element in nums2
  let p = m + n - 1; // pointer to where we write next, from the back

  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1]; // nums1's value is bigger, place it at the end
      p1--;
    } else {
      nums1[p] = nums2[p2]; // nums2's value is bigger (or equal), place it
      p2--;
    }
    p--;
  }
  // If nums2 still has leftovers, copy them in - anything left in nums1
  // (p1 >= 0) is already smaller and already in the right spot.
  while (p2 >= 0) {
    nums1[p] = nums2[p2];
    p2--;
    p--;
  }
};
