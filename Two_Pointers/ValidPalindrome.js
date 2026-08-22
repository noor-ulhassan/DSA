/**
 * Checks if a string is a valid palindrome, considering only alphanumeric characters and ignoring cases.
 * @param {string} s - The input string
 * @return {boolean} - True if valid palindrome, false otherwise
 */
var isPalindrome = function (s) {
  // Two pointers starting from the ends of the string
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip non-alphanumeric characters from the left
    if (!isAlphaNumeric(s[left])) {
      left++;
    } 
    // Skip non-alphanumeric characters from the right
    else if (!isAlphaNumeric(s[right])) {
      right--;
    } 
    // Compare characters ignoring case
    else if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false; // Mismatch found, not a palindrome
    } 
    // Both characters match, move pointers inward
    else {
      left++;
      right--;
    }
  }

  // All characters matched successfully
  return true;
};

/**
 * Helper function to check if a character is alphanumeric.
 * @param {string} c - A single character
 * @return {boolean} - True if alphanumeric, false otherwise
 */
function isAlphaNumeric(c) {
  const lower = c.toLowerCase();
  // Check if character is a letter or a number
  return (lower >= "a" && lower <= "z") || (c >= "0" && c <= "9");
}
