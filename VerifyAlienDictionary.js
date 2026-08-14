function isAlienSorted(words, order) {
  const rank = new Map();
  for (let i = 0; i < order.length; i++) {
    rank.set(order[i], i);
  }

  const inOrder = (word1, word2) => {
    const minLen = Math.min(word1.length, word2.length);
    for (let j = 0; j < minLen; j++) {
      if (word1[j] !== word2[j]) {
        return rank.get(word1[j]) < rank.get(word2[j]);
      }
    }
    return word1.length <= word2.length;
  };

  for (let i = 0; i < words.length - 1; i++) {
    if (!inOrder(words[i], words[i + 1])) {
      return false;
    }
  }

  return true;
}
