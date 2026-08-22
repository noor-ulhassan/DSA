/**
 * Finds the index of the first character in the string that matches 
 * the character at the corresponding mirrored position from the end.
 * @param {string} s - The input string
 * @return {number} - The index of the first match, or -1 if no match is found
 */
function firstMatchingIndex(s) {
  const n = s.length;

  // Iterate through the string from the beginning
  for (let i = 0; i < n; i++) {
    // Check if the current character matches its counterpart from the end
    // i is the distance from start, (n - i - 1) is the distance from end
    if (s[i] === s[n - i - 1]) {
      return i; // Match found, return the index
    }
  }

  return -1; // No match found
}
