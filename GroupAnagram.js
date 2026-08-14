/**
 * GROUP ANAGRAMS
 * ---------------------------------------------------------------------
 * Problem: Given an array of strings, group the strings that are
 * anagrams of each other together. Order of groups/strings doesn't matter.
 *
 * Key insight: two strings are anagrams if and only if they have the
 * exact same letter frequency count. So if we can turn every string
 * into a "fingerprint" that is identical for anagrams and different
 * otherwise, we can just bucket strings by that fingerprint using a Map.
 *
 * Fingerprint used here: a 26-length array where index 0 = how many
 * 'a's, index 1 = how many 'b's, etc. (same idea as Valid Anagram, but
 * this time we keep the counts instead of comparing two strings).
 * Two anagram strings always produce the exact same count array.
 *
 * We can't use an array directly as a Map key (arrays are compared by
 * reference, not contents), so we convert the counts into a string
 * signature by joining them with "#", e.g. [1,0,0,...,1,...] becomes
 * "1#0#0#...#1#...". Now identical count arrays produce identical
 * string keys, and the Map groups matching strings together.
 *
 * VISUAL WALKTHROUGH for strs = ["eat","tea","tan","ate","nat","bat"]
 * ---------------------------------------------------------------------
 *
 *   each string -> 26-slot letter fingerprint -> joined into a signature
 *
 *   "eat" -> {a:1,e:1,t:1} -> sig A = "1#0#0#0#1#0..0#1#0..0"
 *   "tea" -> {a:1,e:1,t:1} -> sig A  (same!)
 *   "tan" -> {a:1,n:1,t:1} -> sig B = "1#0..0#1#0..0#1#0..0"
 *   "ate" -> {a:1,e:1,t:1} -> sig A  (same!)
 *   "nat" -> {a:1,n:1,t:1} -> sig B  (same!)
 *   "bat" -> {a:1,b:1,t:1} -> sig C = "1#1#0..0#1#0..0"
 *
 *   map buckets fill up as we go:
 *
 *     sig A  ┌─────────────────────┐
 *            │ eat                 │
 *            │ eat, tea            │
 *            │ eat, tea, ate       │
 *            └─────────────────────┘
 *     sig B  ┌─────────────────────┐
 *            │ tan                 │
 *            │ tan, nat            │
 *            └─────────────────────┘
 *     sig C  ┌─────────────────────┐
 *            │ bat                 │
 *            └─────────────────────┘
 *
 *   return map.values():
 *     [ ["eat","tea","ate"], ["tan","nat"], ["bat"] ]
 *
 *   Like sorting mail into cubbyholes labeled by fingerprint - every
 *   anagram of "eat" always computes the identical fingerprint, so
 *   they're guaranteed to land in the same cubbyhole.
 *
 * Time:  O(n * k)  - n strings, each of average length k, to build counts.
 * Space: O(n * k)  - storing all strings plus their signatures in the map.
 *
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Map(); // signature (letter-count fingerprint) -> list of strings
  for (let str of strs) {
    const count = new Array(26).fill(0); // reset a fresh counter per string
    for (let char of str) {
      count[char.charCodeAt(0) - 97]++;
    }
    const signature = count.join("#"); // turn the counts into a comparable string key
    if (!map.has(signature)) {
      map.set(signature, []); // first time we see this fingerprint, start a new group
    }
    map.get(signature).push(str);
  }
  return Array.from(map.values()); // return just the groups, not the fingerprints
};
