/**
 * VALID ANAGRAM
 * ---------------------------------------------------------------------
 * Problem: Given two strings s and t (lowercase letters only), decide
 * whether t is an anagram of s - i.e. t is made of exactly the same
 * letters as s, same quantities, just possibly reordered.
 *
 * Quick rejection: anagrams must have the same length. If lengths
 * differ, we can return false immediately without doing any real work.
 *
 * Core idea: instead of sorting both strings and comparing (O(n log n)),
 * we count how many times each of the 26 lowercase letters appears.
 * If both strings produce the exact same letter counts, they're
 * anagrams of each other.
 *
 * Trick used here: rather than keeping two separate count arrays, we
 * use ONE array of 26 counters and:
 *   - increment the counter for each letter in s
 *   - decrement the counter for each letter in t
 * If s and t are true anagrams, every increment from s is cancelled
 * out by a matching decrement from t, leaving every counter at 0.
 * If any counter is non-zero at the end, the letter frequencies didn't
 * match, so it's not an anagram.
 *
 * `charCodeAt(i) - 97` converts a lowercase letter to an index 0-25
 * because 'a'.charCodeAt(0) is 97, 'b' is 98, and so on.
 *
 * VISUAL WALKTHROUGH for s = "cat", t = "act"
 * ---------------------------------------------------------------------
 *
 *   26 slots, one per letter a..z, all starting at 0:
 *     [ a:0  b:0  c:0  d:0  e:0  ...  t:0  ...  z:0 ]
 *
 *   scan s="cat" (increment):        scan t="act" (decrement):
 *     c -> counts[c]++                 a -> counts[a]--
 *     a -> counts[a]++                 c -> counts[c]--
 *     t -> counts[t]++                 t -> counts[t]--
 *
 *   net effect per letter that was touched:
 *     a:  +1 -1 = 0
 *     c:  +1 -1 = 0
 *     t:  +1 -1 = 0
 *     (every other letter never touched, stays 0)
 *
 *   final counts:  [ a:0  b:0  c:0  ...  t:0  ...  z:0 ]
 *                     └──────────── all zero ────────────┘
 *   every slot cancelled out perfectly  ->  TRUE, it's an anagram!
 *
 *   Compare with a NON-anagram, s="cat", t="cbt":
 *     a:+1  b:-1  c:+1-1=0  t:+1-1=0
 *     counts: [ a:+1  b:-1  ... ]  <- non-zero slots remain
 *     found a non-zero slot -> FALSE, not an anagram
 *
 * Time:  O(n)  - one pass over s, one pass over t, one pass over 26 slots.
 * Space: O(1)  - the counts array is always fixed size 26, regardless of input size.
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false; // different lengths can never be anagrams

  const counts = new Array(26).fill(0); // one counter per letter a-z
  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i) - 97]++; // letter from s: count it
    counts[t.charCodeAt(i) - 97]--; // letter from t: uncount it
  }
  for (let count of counts) {
    if (count !== 0) return false; // some letter appeared a different number of times
  }
  return true; // every letter cancelled out perfectly
};
