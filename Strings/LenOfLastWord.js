/**
 * LENGTH OF LAST WORD
 * ---------------------------------------------------------------------
 * Problem: Given a string `s` of words separated by spaces, return the
 * length of the LAST word. There may be trailing spaces, and words
 * contain no spaces themselves.
 *
 * Approach: work backwards from the end of the string so we never have
 * to split or trim the whole thing.
 *   1. Skip any trailing spaces: walk `i` left while s[i] is ' '.
 *   2. Count non-space characters: keep walking left, incrementing
 *      `count`, until we hit another space or run off the front.
 * `count` is then the length of the last word. If the string is all
 * spaces, step 2 never runs and count stays 0.
 *
 * VISUAL WALKTHROUGH for s = "Hello World  "
 * ---------------------------------------------------------------------
 *
 *   index:  0 1 2 3 4 5 6 7 8 9 10 11
 *           H e l l o _ W o r l d  _  _
 *
 *   start i = 11
 *   skip trailing spaces:  s[11]=' ', s[10]=' '  ->  i = 9
 *   count letters:  s[9]='d' s[8]='l' s[7]='r' s[6]='o' s[5]='W'
 *                   count = 5, then s[4]=' '  ->  stop
 *
 *   return 5
 *
 * Time:  O(k)  - k = length of the trailing spaces plus the last word;
 *        never scans the earlier part of the string.
 * Space: O(1)  - two integer variables.
 *
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  let i = s.length - 1;
  let count = 0;

  while (i >= 0 && s[i] === " ") {
    i--;
  }

  while (i >= 0 && s[i] !== " ") {
    count++;
    i--;
  }
  return count;
};
