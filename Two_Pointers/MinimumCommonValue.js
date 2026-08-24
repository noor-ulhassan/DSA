/**
 * Finds the minimum common value between two sorted arrays.
 * If there is no common value, returns -1.
 * @param {number[]} nums1 - The first sorted integer array
 * @param {number[]} nums2 - The second sorted integer array
 * @return {number} - The minimum common value, or -1 if none exists
 */
var getCommon = function(nums1, nums2) {
    // Initialize two pointers for iterating through both arrays
    let i = 0;
    let j = 0;

    // Traverse both arrays as long as both pointers are within bounds
    while (i < nums1.length && j < nums2.length) {
        // If a common element is found, it must be the minimum since both arrays are sorted
        if (nums1[i] === nums2[j]) {
            return nums1[i];
        } 
        // If the element in nums1 is smaller, move the first pointer forward
        else if (nums1[i] < nums2[j]) {
            i++;
        } 
        // If the element in nums2 is smaller, move the second pointer forward
        else {
            j++;
        }
    }

    // No common element found
    return -1;
};