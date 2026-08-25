/**
 * FIRST MATCHING CHARACTER (MIRRORED)
 * ---------------------------------------------------------------------
 * Problem: Given a string s, find the index of the first character that
 * matches its mirrored counterpart from the end of the string - that
 * is, the smallest i such that s[i] === s[n - i - 1]. Return -1 if no
 * such index exists.
 *
 * Approach: walk the string left to right. For each index i, its
 * mirror position from the end is n - i - 1 (i=0 mirrors the last
 * character, i=1 mirrors the second-to-last, and so on). Comparing
 * s[i] to that mirror as we scan means the very first match found is
 * automatically the smallest such i, so we can return immediately.
 *
 * VISUAL WALKTHROUGH for s = "abcxa"  (n = 5)
 * ---------------------------------------------------------------------
 *
 *   index:      0    1    2    3    4
 *   s:       [  a  , b  , c  , x  , a  ]
 *
 *   i=0: mirror index = n-0-1 = 4   s[0]='a'  s[4]='a'   MATCH!
 *        -> return 0
 *
 *   (if s[0] hadn't matched, we'd continue to i=1 with mirror index 3,
 *   then i=2 with mirror index 2 - the exact middle, which always
 *   matches itself for odd-length strings.)
 *
 * Time:  O(n)  - at most one pass through half the string before a
 *        match (or the full string if no match exists).
 * Space: O(1)  - no extra structures used.
 *
 * @param {string} s - The input string
 * @return {number} - The index of the first match, or -1 if no match is found
 */
function firstMatchingIndex(s) {
  const n = s.length;

  for (let i = 0; i < n; i++) {
    if (s[i] === s[n - i - 1]) {
      return i;
    }
  }

  return -1;
}
