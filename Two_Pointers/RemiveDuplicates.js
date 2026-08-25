/**
 * REMOVE DUPLICATES FROM SORTED ARRAY
 * ---------------------------------------------------------------------
 * Problem: Given a sorted array nums, remove the duplicates in-place so
 * each unique element appears only once, keeping the relative order.
 * Return the count of unique elements (the first `count` slots of nums
 * must hold the unique values in order; what's beyond doesn't matter).
 *
 * Because the array is already sorted, every duplicate of a value sits
 * directly next to it - so we never need to look further than "does
 * this match the last unique value I kept?".
 *
 * Two pointers, same-direction pattern: `slow` marks the last index of
 * the unique region built so far. `fast` scans ahead looking for a
 * value different from nums[slow]. Whenever it finds one, `slow`
 * advances by one and that new value gets written into place - so the
 * front of the array is compacted into unique values as we go.
 *
 * VISUAL WALKTHROUGH for nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
 * ---------------------------------------------------------------------
 *
 *   slow=0 (nums[0]=0 is the first unique value, already in place)
 *
 *   fast=1  nums[1]=0 == nums[slow]=0        -> duplicate, skip
 *   fast=2  nums[2]=1 != nums[slow]=0        -> new unique!
 *           slow=1, nums[1]=1   region so far: [0,1]
 *   fast=3  nums[3]=1 == nums[slow]=1        -> skip
 *   fast=4  nums[4]=1 == nums[slow]=1        -> skip
 *   fast=5  nums[5]=2 != nums[slow]=1        -> new unique!
 *           slow=2, nums[2]=2   region so far: [0,1,2]
 *   fast=6  nums[6]=2 == nums[slow]=2        -> skip
 *   fast=7  nums[7]=3 != nums[slow]=2        -> new unique!
 *           slow=3, nums[3]=3   region so far: [0,1,2,3]
 *   fast=8  nums[8]=3 == nums[slow]=3        -> skip
 *   fast=9  nums[9]=4 != nums[slow]=3        -> new unique!
 *           slow=4, nums[4]=4   region so far: [0,1,2,3,4]
 *
 *   final: slow=4 -> return 5 unique elements, sitting at nums[0..4]
 *
 * Time:  O(n)  - `fast` sweeps the array once.
 * Space: O(1)  - rearranged in place, no extra structures.
 *
 * @param {number[]} nums - The sorted array
 * @return {number} - The number of unique elements
 */
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let slow = 0; // index of the last unique element placed so far

  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[slow] !== nums[fast]) {
      slow++; // make room for a new unique value
      nums[slow] = nums[fast]; // write it into the compacted region
    }
  }

  return slow + 1; // count of unique elements
}
