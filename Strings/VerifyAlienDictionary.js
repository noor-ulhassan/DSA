/**
 * VERIFY ALIEN DICTIONARY
 * ---------------------------------------------------------------------
 * Problem: You're given the alphabet order of an alien language (e.g.
 * "hlabcdefgijkmnopqrstuvwxyz" - meaning 'h' comes before 'l', which
 * comes before 'a', etc, instead of the normal a-z order). Given a
 * list of words, check whether they're sorted according to THIS
 * custom alphabet order, the same way a dictionary would be sorted.
 *
 * Step 1 - build a rank lookup.
 * Normal comparison (word1 < word2) relies on JS knowing 'a' < 'b'.
 * That built-in knowledge is USELESS here because the alien alphabet
 * has its own order. So we build our own lookup table: rank.set(letter,
 * position in the given order). Now "which letter comes first?" is
 * just "which letter has the smaller rank number?" - an O(1) check.
 *
 * Step 2 - compare each adjacent pair of words (inOrder helper).
 * Just like normal dictionary order: walk both words character by
 * character until you find the first position where they differ - the
 * word whose character has the SMALLER rank comes first. If one word
 * is a prefix of the other (they match all the way through), the
 * SHORTER word must come first (like "car" before "card").
 *
 * Step 3 - the whole list is valid only if EVERY adjacent pair is in
 * order. We never need to compare non-adjacent words directly: if
 * word[0] <= word[1] and word[1] <= word[2], then transitively
 * word[0] <= word[2] is guaranteed, so checking neighbors is enough.
 *
 * VISUAL WALKTHROUGH for order = "hlabcdefgijkmnopqrstuvwxyz",
 *                     words = ["hello", "leetcode"]
 * ---------------------------------------------------------------------
 *
 *   alien alphabet position (rank):
 *     h:0  l:1  a:2  b:3  c:4  d:5  e:6  f:7  g:8  i:9  ...
 *
 *   compare "hello" vs "leetcode" letter by letter:
 *
 *     word1: h  e  l  l  o
 *     word2: l  e  e  t  c  o  d  e
 *            │
 *            └─ first letters differ right away: 'h' vs 'l'
 *
 *   rank('h') = 0     rank('l') = 1
 *        0     <      1   ->  'h' comes first  ->  "hello" IS in order
 *
 *   move to next pair... (only one pair here) -> every pair in order
 *   -> return true
 *
 *   Contrast with words = ["word", "world"]  (normal a-z order):
 *     word1: w  o  r  d
 *     word2: w  o  r  l  d
 *                     │
 *                     └─ differ at index 3: 'd' vs 'l'
 *     rank('d')=3  rank('l')=11   3 < 11 -> "word" correctly before "world"
 *
 * Time:  O(C)  where C = total number of characters across all words -
 *        each character is visited once while comparing neighbors.
 * Space: O(1)  - the rank map is capped at 26 entries regardless of input.
 */
function isAlienSorted(words, order) {
  const rank = new Map(); // letter -> its position in the alien alphabet
  for (let i = 0; i < order.length; i++) {
    rank.set(order[i], i);
  }

  const inOrder = (word1, word2) => {
    const minLen = Math.min(word1.length, word2.length);
    for (let j = 0; j < minLen; j++) {
      if (word1[j] !== word2[j]) {
        // first differing letter decides the order between the two words
        return rank.get(word1[j]) < rank.get(word2[j]);
      }
    }
    // all shared letters matched - shorter word must come first
    return word1.length <= word2.length;
  };

  for (let i = 0; i < words.length - 1; i++) {
    if (!inOrder(words[i], words[i + 1])) {
      return false; // found a neighboring pair that's out of order
    }
  }

  return true; // every neighboring pair checked out
}
