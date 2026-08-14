/**
 * PRODUCT OF ARRAY EXCEPT SELF
 * ---------------------------------------------------------------------
 * Problem: Given an array nums, return an array answer where
 * answer[i] equals the product of every element in nums EXCEPT
 * nums[i]. Must be done without using division, and ideally in O(n)
 * time (a brute-force double loop multiplying everything except the
 * current index would be O(n^2)).
 *
 * Key insight: "the product of everything except index i" can be
 * split into two halves:
 *   - the product of everything to the LEFT of i  (prefix product)
 *   - the product of everything to the RIGHT of i (postfix/suffix product)
 * Multiply those two halves together and you get the product of
 * everything except nums[i] itself - because i is excluded from both
 * halves by definition.
 *
 * Pass 1 (left to right) - build prefix products:
 *   answer[i] is set to the product of all elements BEFORE index i.
 *   We track a running `prefix` variable that starts at 1 (product of
 *   nothing) and gets multiplied by nums[i] AFTER being stored, so at
 *   each index it only reflects elements strictly to the left.
 *
 * Pass 2 (right to left) - fold in postfix products:
 *   Same idea in reverse. We track a running `postfix` variable
 *   (product of everything strictly to the right of i so far) and
 *   multiply it into the answer[i] we already computed in pass 1.
 *   After this pass, answer[i] = (product of left side) * (product of
 *   right side) = product of everything except nums[i].
 *
 * VISUAL WALKTHROUGH for nums = [1, 2, 3, 4]
 * ---------------------------------------------------------------------
 *
 *   index:      0     1     2     3
 *   nums:    [  1  ,  2  ,  3  ,  4  ]
 *
 *   PASS 1 (left -> right): stamp in the product of everything LEFT of i
 *
 *     prefix=1 -> answer[0]=1     prefix = 1*1 = 1
 *     prefix=1 -> answer[1]=1     prefix = 1*2 = 2
 *     prefix=2 -> answer[2]=2     prefix = 2*3 = 6
 *     prefix=6 -> answer[3]=6     prefix = 6*4 = 24
 *
 *   after pass 1:   [   1  ,   1  ,   2  ,   6   ]
 *                     none    (1)   (1*2) (1*2*3)   <- product of left side
 *
 *   PASS 2 (right -> left): multiply in the product of everything RIGHT of i
 *
 *     postfix=1  -> answer[3] = 6*1  = 6     postfix = 1*4  = 4
 *     postfix=4  -> answer[2] = 2*4  = 8     postfix = 4*3  = 12
 *     postfix=12 -> answer[1] = 1*12 = 12    postfix = 12*2 = 24
 *     postfix=24 -> answer[0] = 1*24 = 24    postfix = 24*1 = 24
 *
 *   FINAL answer:   [  24  ,  12  ,   8  ,   6  ]
 *
 *   what multiplied together for each slot:
 *     index 0:  (nothing left)  x  (2*3*4 right)  = 24
 *     index 1:  (1 left)        x  (3*4 right)    = 12
 *     index 2:  (1*2 left)      x  (4 right)      = 8
 *     index 3:  (1*2*3 left)    x  (nothing right)= 6
 *
 * Time:  O(n)  - two linear passes over the array.
 * Space: O(1) extra  - only the output array is used (not counted as
 *        extra space by convention), plus two scalar accumulators.
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  let n = nums.length;
  let answer = new Array(n);
  let prefix = 1; // running product of everything to the left of current index

  for (let i = 0; i < n; i++) {
    answer[i] = prefix; // store product of everything left of i
    prefix = prefix * nums[i]; // then extend the running product to include i
  }

  let postfix = 1; // running product of everything to the right of current index
  for (let i = n - 1; i >= 0; i--) {
    answer[i] = answer[i] * postfix; // combine left product (already stored) with right product
    postfix = postfix * nums[i]; // then extend the running product to include i
  }

  return answer;
};
