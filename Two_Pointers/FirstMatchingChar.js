function firstMatchingIndex(s) {
  const n = s.length;

  for (let i = 0; i < n; i++) {
    if (s[i] === s[n - i - 1]) {
      return i;
    }
  }

  return -1;
}
