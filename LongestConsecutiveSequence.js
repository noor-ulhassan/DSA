function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let longest = 0;

  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum = currentNum + 1;
        currentStreak = currentStreak + 1;
      }

      longest = Math.max(longest, currentStreak);
    }
  }

  return longest;
}
