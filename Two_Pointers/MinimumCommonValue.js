/**
 * MINIMUM COMMON VALUE
 * ---------------------------------------------------------------------
 * Problem: Given two sorted integer arrays nums1 and nums2, return the
 * smallest number that appears in both. Return -1 if there's no common
 * value.
 *
 * Approach: since both arrays are already sorted, we can walk them at
 * the same time with two pointers instead of checking every pair
 * (which would be O(n*m)) or hashing one array first. At each step,
 * compare the elements the two pointers are on:
 *   - if they're equal, that's a common value - and because both
 *     arrays are sorted and we've been advancing the smaller side, it's
 *     guaranteed to be the SMALLEST common value possible.
 *   - if nums1's element is smaller, it can never match anything we've
 *     already passed in nums2, so advance nums1's pointer to look for a
 *     bigger candidate.
 *   - otherwise, advance nums2's pointer for the same reason.
 * If either pointer runs off the end of its array with no match found,
 * there's no common value.
 *
 * VISUAL WALKTHROUGH for nums1 = [1, 2, 3], nums2 = [2, 4]
 * ---------------------------------------------------------------------
 *
 *   i=0 j=0   nums1[0]=1  nums2[0]=2   1 < 2 -> advance i
 *   i=1 j=0   nums1[1]=2  nums2[0]=2   equal! -> return 2
 *
 *   (if nums1 were [1,3] instead, we'd advance i to 3, then compare
 *   3 vs 2 -> advance j; j runs off the end of nums2 -> return -1)
 *
 * Time:  O(n + m)  - each pointer advances at most through its own
 *        array once.
 * Space: O(1)  - just two index pointers.
 *
 * @param {number[]} nums1 - The first sorted integer array
 * @param {number[]} nums2 - The second sorted integer array
 * @return {number} - The minimum common value, or -1 if none exists
 */
var getCommon = function (nums1, nums2) {
  let i = 0;
  let j = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      return nums1[i]; // smallest common value, since both sides are sorted
    } else if (nums1[i] < nums2[j]) {
      i++; // nums1's value is too small to match anything ahead in nums2
    } else {
      j++; // nums2's value is too small to match anything ahead in nums1
    }
  }

  return -1;
};
