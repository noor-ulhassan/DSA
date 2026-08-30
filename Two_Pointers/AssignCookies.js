/**
 * ASSIGN COOKIES
 * ---------------------------------------------------------------------
 * Problem: Each child i has a greed factor g[i] (the minimum cookie
 * size that will satisfy them) and each cookie j has a size s[j]. A
 * cookie can satisfy a child only if s[j] >= g[i], and each cookie
 * goes to at most one child. Return the maximum number of children
 * that can be made content.
 *
 * Approach: greedy with two pointers. Sort both arrays ascending, then
 * always try to satisfy the least greedy remaining child with the
 * smallest cookie that can still do the job. Walking both arrays from
 * the small end:
 *   - if the current cookie fits the current child (s[cookie] >= g[child]),
 *     hand it over: advance both pointers.
 *   - if it doesn't fit, this cookie is too small for this child and,
 *     since the array is sorted, too small for every remaining child
 *     too - discard it by advancing only the cookie pointer.
 * The child pointer ends up equal to the count of satisfied children.
 *
 * Why greedy is safe: giving a child the smallest cookie that satisfies
 * them never wastes a larger cookie that a greedier child might need,
 * so no better assignment is possible.
 *
 * VISUAL WALKTHROUGH for g = [1, 2, 3], s = [1, 1]
 * ---------------------------------------------------------------------
 *
 *   sorted:  g = [1, 2, 3]   s = [1, 1]
 *
 *   child=0 cookie=0   s[0]=1 >= g[0]=1  ->  satisfy, child=1 cookie=1
 *   child=1 cookie=1   s[1]=1 <  g[1]=2  ->  discard cookie, cookie=2
 *   cookie=2 == s.length  ->  loop ends
 *
 *   answer: child = 1   (only one child can be made content)
 *
 * VISUAL WALKTHROUGH for g = [1, 2], s = [1, 2, 3]
 * ---------------------------------------------------------------------
 *
 *   child=0 cookie=0   1 >= 1  ->  satisfy, child=1 cookie=1
 *   child=1 cookie=1   2 >= 2  ->  satisfy, child=2 cookie=2
 *   child=2 == g.length  ->  loop ends
 *
 *   answer: child = 2
 *
 * Time:  O(n log n + m log m)  - dominated by sorting the two arrays;
 *        the single two-pointer pass is O(n + m).
 * Space: O(1)  - ignoring the sort, only two index counters.
 *
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let child = 0;
  let cookie = 0;
  while (child < g.length && cookie < s.length) {
    if (s[cookie] >= g[child]) {
      child++;
    }
    cookie++;
  }
  return child;
};
