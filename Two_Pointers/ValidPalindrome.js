/**
 * VALID PALINDROME
 * ---------------------------------------------------------------------
 * Problem: Given a string s, determine if it's a palindrome when
 * considering only alphanumeric characters and ignoring case.
 *
 * Approach: classic opposite-ends two pointers. `left` starts at the
 * beginning, `right` at the end, and they move toward each other.
 * Non-alphanumeric characters (spaces, punctuation) are simply skipped
 * by advancing the relevant pointer without comparing anything - they
 * don't count toward the palindrome check at all. Once both pointers
 * sit on real characters, compare them case-insensitively; any
 * mismatch means it's not a palindrome. If the pointers cross without
 * ever mismatching, every character lined up correctly.
 *
 * VISUAL WALKTHROUGH for s = "A man, a plan, a canal: Panama"
 * ---------------------------------------------------------------------
 *
 *   left=0 'A'                              right=29 'a'
 *   both alphanumeric -> 'a' === 'a' (lowercased) -> match, move inward
 *
 *   left=1 ' '  -> not alphanumeric -> skip, left++
 *   left=2 'm'                              right=28 'm'
 *   'm' === 'm' -> match, move inward
 *
 *   ... this continues, skipping spaces/commas/colons on either side
 *   and comparing only real characters, until left and right meet or
 *   cross in the middle without ever finding a mismatch
 *
 *   -> return true
 *
 *   Contrast with s = "race a car": comparing 'r' (left) to 'r' (right)
 *   matches, but a few steps in 'e' meets 'a' - mismatch -> return false
 *
 * Time:  O(n)  - each pointer moves inward at most n/2 times total.
 * Space: O(1)  - only two pointers, no extra string built.
 *
 * @param {string} s - The input string
 * @return {boolean} - True if valid palindrome, false otherwise
 */
var isPalindrome = function (s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (!isAlphaNumeric(s[left])) {
      left++; // skip non-alphanumeric characters from the left
    } else if (!isAlphaNumeric(s[right])) {
      right--; // skip non-alphanumeric characters from the right
    } else if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false; // mismatch found, not a palindrome
    } else {
      left++;
      right--;
    }
  }

  return true;
};

/**
 * Helper function to check if a character is alphanumeric.
 * @param {string} c - A single character
 * @return {boolean} - True if alphanumeric, false otherwise
 */
function isAlphaNumeric(c) {
  const lower = c.toLowerCase();
  return (lower >= "a" && lower <= "z") || (c >= "0" && c <= "9");
}
