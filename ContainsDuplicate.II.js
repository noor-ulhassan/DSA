/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
function containsNearbyDuplicate(nums, k) {
  const lastSeen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (lastSeen.has(num) && i - lastSeen.get(num) <= k) {
      return true;
    }

    lastSeen.set(num, i);
  }

  return false;
}
