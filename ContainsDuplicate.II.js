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

// Using Hash set

function containsNearbyDuplicate(nums, k) {
  const window = new Set();

  for (let i = 0; i < nums.length; i++) {
    if (window.has(nums[i])) return true;

    window.add(nums[i]);

    if (window.size > k) {
      window.delete(nums[i - k]);
    }
  }
  return false;
}
