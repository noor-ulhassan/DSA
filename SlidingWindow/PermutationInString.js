/**
 * PERMUTATION IN STRING
 * ---------------------------------------------------------------------
 * Problem: Given two strings s1 and s2, return true if s2 contains a
 * permutation of s1 as a contiguous substring - i.e. some rearrangement
 * of s1's letters appears somewhere in s2. Must run in roughly O(n)
 * time, so generating every permutation of s1 and searching for each
 * (factorial blowup) doesn't count as the intended solution.
 *
 * Step 1 - a permutation is just "the same letters, same counts, any
 * order". That means the actual question is: does s2 contain any
 * window of length s1.length whose character-frequency map exactly
 * matches s1's character-frequency map? Order stops mattering once we
 * think in terms of counts.
 *
 * Step 2 - fixed-size sliding window over s2. `need` holds s1's letter
 * counts (built once). `window` holds the letter counts of the current
 * slice of s2 between pointers `left` and `right`. Expand `right` one
 * character at a time, adding to `window`; whenever the window grows
 * past s1.length, shrink from `left` (removing that character from
 * `window`, deleting the key entirely once its count hits 0 so empty
 * slots don't break the size comparison in mapsEqual).
 *
 * Step 3 - after each expand/shrink step the window is exactly
 * s1.length characters wide (once right has advanced far enough), so
 * compare `window` to `need`. The moment they match, s2's current
 * window is a permutation of s1 - return true immediately. If `right`
 * finishes sweeping s2 with no match, no permutation exists - return
 * false.
 *
 * VISUAL WALKTHROUGH for s1 = "ab", s2 = "eidbaooo"
 * ---------------------------------------------------------------------
 *
 *   need = { a:1, b:1 }        window size target = s1.length = 2
 *
 *   right=0 'e': window={e:1}                     size 1 (< 2, no shrink)
 *   right=1 'i': window={e:1,i:1}                 size 2, compare to need -> no match
 *   right=2 'd': window={e:1,i:1,d:1}              size 3 > 2 -> shrink left ('e')
 *                window={i:1,d:1}, left=1          compare to need -> no match
 *   right=3 'b': window={i:1,d:1,b:1}              size 3 > 2 -> shrink left ('i')
 *                window={d:1,b:1}, left=2          compare to need -> no match
 *   right=4 'a': window={d:1,b:1,a:1}              size 3 > 2 -> shrink left ('d')
 *                window={b:1,a:1}, left=3          compare to need={a:1,b:1} -> MATCH!
 *
 *   return true - the window s2[3..4] = "ba" is a permutation of "ab"
 *
 * Time:  O(n)  where n = s2.length - each character enters and leaves
 *        the window at most once (right advances n times, left
 *        advances at most n times), and mapsEqual is O(26) at worst
 *        since maps are capped at the alphabet size.
 * Space: O(1)  - both maps hold at most 26 letter-count entries
 *        regardless of input length.
 */
function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;

  const need = new Map(); // required letter counts, built once from s1
  for (const ch of s1) {
    need.set(ch, (need.get(ch) || 0) + 1);
  }

  const window = new Map(); // letter counts of the current s2 slice
  let left = 0;

  for (let right = 0; right < s2.length; right++) {
    const c = s2[right];
    window.set(c, (window.get(c) || 0) + 1);

    if (right - left + 1 > s1.length) {
      // window grew past s1's length - shrink from the left to keep it fixed-size
      const leftChar = s2[left];
      window.set(leftChar, window.get(leftChar) - 1);
      if (window.get(leftChar) === 0) {
        window.delete(leftChar); // drop zero-count keys so size comparisons stay accurate
      }
      left++;
    }

    if (mapsEqual(need, window)) {
      return true; // current window's letters match s1's exactly - found a permutation
    }
  }

  return false;
}

function mapsEqual(need, window) {
  if (need.size !== window.size) return false;
  for (const [ch, count] of need) {
    if (window.get(ch) !== count) return false;
  }
  return true;
}



// Two Array Method :

function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false;

    const need = new Array(26).fill(0);
    const window = new Array(26).fill(0);
    const a = "a".charCodeAt(0);

    for (let i = 0; i < s1.length; i++) {
        need[s1.charCodeAt(i) - a]++;
        window[s2.charCodeAt(i) - a]++;
    }

    if (arraysEqual(need, window)) return true;

    for (let i = s1.length; i < s2.length; i++) {
        window[s2.charCodeAt(i) - a]++;
        window[s2.charCodeAt(i - s1.length) - a]--;
        if (arraysEqual(need, window)) return true;
    }

    return false;
}

function arraysEqual(a, b) {
    for (let i = 0; i < 26; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}