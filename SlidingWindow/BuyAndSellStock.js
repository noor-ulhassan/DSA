/**
 * BEST TIME TO BUY AND SELL STOCK
 * ---------------------------------------------------------------------
 * Problem: Given an array of daily stock prices, find the maximum
 * profit from a single buy followed by a single sell (buy must happen
 * before sell). If no profit is possible, return 0. Must run in O(n)
 * time, so checking every buy/sell pair (O(n^2)) doesn't count as the
 * intended solution.
 *
 * Step 1 - two pointers, sliding window style. `left` marks the best
 * buy day found so far, `right` scans forward as the candidate sell
 * day. Since left always stays at or behind right, this is really one
 * pass over the array with two cursors instead of nested loops.
 *
 * Step 2 - at each `right`, compare prices[left] to prices[right]:
 *   - if prices[left] < prices[right], selling today would be
 *     profitable. Compute the profit and keep the best one seen.
 *   - if prices[left] >= prices[right], buying at `left` is no longer
 *     the cheapest option - today's price is lower (or equal), so jump
 *     `left` up to `right`. This never loses a better answer: any
 *     profit from the old `left` would only get worse from here on,
 *     since `right` just found something cheaper or the same.
 *
 * Step 3 - `right` always advances by one. `left` only ever moves
 * forward to `right`'s position, never backward, which is what keeps
 * the whole scan O(n).
 *
 * VISUAL WALKTHROUGH for prices = [7, 1, 5, 3, 6, 4]
 * ---------------------------------------------------------------------
 *
 *   index:   0  1  2  3  4  5
 *   price:   7  1  5  3  6  4
 *
 *   left=0, right=1: prices[0]=7, prices[1]=1 -> 7 < 1? no
 *            -> price dropped, move left to right: left=1
 *
 *   left=1, right=2: prices[1]=1, prices[2]=5 -> 1 < 5? yes
 *            -> profit = 5-1 = 4          maxProfit = max(0,4) = 4
 *
 *   left=1, right=3: prices[1]=1, prices[3]=3 -> 1 < 3? yes
 *            -> profit = 3-1 = 2          maxProfit = max(4,2) = 4
 *
 *   left=1, right=4: prices[1]=1, prices[4]=6 -> 1 < 6? yes
 *            -> profit = 6-1 = 5          maxProfit = max(4,5) = 5
 *
 *   left=1, right=5: prices[1]=1, prices[5]=4 -> 1 < 4? yes
 *            -> profit = 4-1 = 3          maxProfit = max(5,3) = 5
 *
 *   right reaches the end -> final answer: maxProfit = 5
 *   (buy at index 1 for 1, sell at index 4 for 6)
 *
 * Time:  O(n)  - `right` sweeps the array once; `left` only ever moves
 *        forward, so it contributes no extra passes.
 * Space: O(1)  - just a couple of pointers and a running max.
 */
function maxProfit(prices) {
  let left = 0; // best buy day found so far
  let right = 1; // candidate sell day
  let maxProfit = 0;

  while (right < prices.length) {
    if (prices[left] < prices[right]) {
      // profitable if sold today - track the best profit seen
      const profit = prices[right] - prices[left];
      maxProfit = Math.max(maxProfit, profit);
    } else {
      // today's price is cheaper (or equal) - it's a better buy point
      left = right;
    }
    right = right + 1;
  }

  return maxProfit;
}
