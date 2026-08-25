/**
 * FLIPPING AN IMAGE
 * ---------------------------------------------------------------------
 * Problem: Given a binary matrix `image` (each cell is 0 or 1), first
 * horizontally flip each row (reverse it), then invert it (0 becomes 1
 * and 1 becomes 0). Return the resulting image.
 *
 * Approach: process each row independently with opposite-ends two
 * pointers. Flipping a row and inverting every value can be fused into
 * a single pass: instead of reversing first and inverting after, swap
 * the pair of mirrored cells (left, right) while simultaneously
 * inverting each value in the same step - `1 - value` flips a 0 to 1
 * or a 1 to 0. If the row has odd length, the middle element has no
 * partner and just gets inverted in place once the pointers meet.
 *
 * VISUAL WALKTHROUGH for row = [1, 1, 0]
 * ---------------------------------------------------------------------
 *
 *   left=0 right=2
 *   [ 1, 1, 0 ]
 *     ▲     ▲
 *   temp = 1 - row[left] = 1 - 1 = 0
 *   row[left] = 1 - row[right] = 1 - 0 = 1     (coincidentally unchanged)
 *   row[right] = temp = 0                       (coincidentally unchanged)
 *   -> [ 1, 1, 0 ]
 *   left=1 right=1
 *
 *   left === right -> middle element, just invert it:
 *   row[1] = 1 - row[1] = 1 - 1 = 0
 *
 *   final row: [ 1, 0, 0 ]
 *
 *   Checked against the two steps done separately: flip (reverse)
 *   [1,1,0] -> [0,1,1], then invert every bit -> [1,0,0]. Same result -
 *   the fused version just does the swap and the inversion together in
 *   one pass instead of two.
 *
 * Time:  O(rows * cols)  - every cell is visited exactly once.
 * Space: O(1) extra  - modified in place (excluding the output itself).
 *
 * @param {number[][]} image
 * @return {number[][]}
 */
var flipAndInvertImage = function (image) {
  for (const row of image) {
    let left = 0;
    let right = row.length - 1;

    while (left < right) {
      const temp = 1 - row[left];
      row[left] = 1 - row[right];
      row[right] = temp;
      left++;
      right--;
    }

    if (left === right) {
      row[left] = 1 - row[left]; // middle element of an odd-length row
    }
  }

  return image;
};
