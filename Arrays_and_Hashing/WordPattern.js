/**
 * WORD PATTERN
 * ---------------------------------------------------------------------
 * Problem: Given a pattern string (e.g. "abba") and a string s made of
 * space-separated words, determine whether s follows the same pattern.
 * "Follows" means there's a one-to-one mapping (a bijection) between
 * each letter in pattern and each word in s - the same letter must
 * always map to the same word, AND the same word must always map back
 * to the same letter.
 *
 * Quick rejection: if the number of letters in pattern doesn't match
 * the number of words in s, they can't possibly correspond one-to-one.
 *
 * Core idea: a bijection needs checking in BOTH directions. Using only
 * one map (letter -> word) would wrongly accept a case like pattern
 * "abba", s = "dog dog dog dog" - every letter maps to some word
 * consistently from letter->word, but 'a' and 'b' would both map to
 * "dog", which breaks the "different letters must map to different
 * words" requirement. So we keep TWO maps, one for each direction, and
 * confirm both agree at every step.
 *
 * Walk pattern and words together, index by index. For letter/word
 * pair (letter, word):
 *   - if letter has been seen before, it must map to this exact word
 *     again (otherwise fail).
 *   - if word has been seen before, it must map back to this exact
 *     letter again (otherwise fail).
 *   - if neither has been seen, record both new associations.
 *
 * VISUAL WALKTHROUGH for pattern = "abba", s = "dog cat cat dog"
 * ---------------------------------------------------------------------
 *
 *   words = ["dog", "cat", "cat", "dog"]   lengths match (4 == 4)
 *
 *   i=0  letter='a' word="dog"
 *        letterToWord: {} -> no 'a' yet -> set a->"dog"
 *        wordToLetter: {} -> no "dog" yet -> set "dog"->a
 *
 *   i=1  letter='b' word="cat"
 *        letterToWord: {a:"dog"} -> no 'b' yet -> set b->"cat"
 *        wordToLetter: {"dog":a} -> no "cat" yet -> set "cat"->b
 *
 *   i=2  letter='b' word="cat"
 *        letterToWord.get('b') = "cat" -> matches current word -> ok
 *        wordToLetter.get("cat") = 'b' -> matches current letter -> ok
 *
 *   i=3  letter='a' word="dog"
 *        letterToWord.get('a') = "dog" -> matches -> ok
 *        wordToLetter.get("dog") = 'a' -> matches -> ok
 *
 *   every index checked out -> return true
 *
 *   Contrast with pattern = "abba", s = "dog dog dog dog": at i=1,
 *   letterToWord has no 'b' yet so it would set b->"dog", but
 *   wordToLetter already has "dog"->'a' from i=0, and the current
 *   letter is 'b' != 'a' -> mismatch -> return false.
 *
 * Time:  O(n)  where n is the number of words/letters - one pass with
 *        O(1) average map operations.
 * Space: O(n)  for the two maps, each holding up to n entries.
 *
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
  const words = s.split(" ");

  if (pattern.length !== words.length) {
    return false;
  }

  const letterToWord = new Map();
  const wordToLetter = new Map();

  for (let i = 0; i < pattern.length; i++) {
    const letter = pattern[i];
    const word = words[i];

    if (letterToWord.has(letter)) {
      if (letterToWord.get(letter) !== word) {
        return false;
      }
    } else {
      letterToWord.set(letter, word);
    }

    if (wordToLetter.has(word)) {
      if (wordToLetter.get(word) !== letter) {
        return false;
      }
    } else {
      wordToLetter.set(word, letter);
    }
  }

  return true;
};
