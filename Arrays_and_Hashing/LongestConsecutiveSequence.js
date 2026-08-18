/**
 * LONGEST CONSECUTIVE SEQUENCE
 * ---------------------------------------------------------------------
 * Problem: Given an unsorted array of numbers, find the length of the
 * longest run of consecutive integers (e.g. [100,4,200,1,3,2] contains
 * the consecutive run 1,2,3,4 -> answer 4). Must run in O(n) time, so
 * sorting first (O(n log n)) doesn't count as the intended solution.
 *
 * Step 1 - dump everything into a Set.
 * A Set gives O(1) average "does this number exist?" lookups and
 * automatically removes duplicates - both useful here.
 *
 * Step 2 - the key trick: only start counting from the BEGINNING of a
 * sequence. For a number to be the start of a consecutive run, (num-1)
 * must NOT be in the set (otherwise num is the middle/end of a run
 * that starts earlier, and that earlier number will handle counting
 * it). This check is what keeps the algorithm O(n) overall: every
 * number only ever gets "walked forward" from as part of ONE run,
 * because we skip starting a walk from any number that isn't a true
 * start. Without this check, we'd re-count the same run over and over
 * from every one of its members - O(n^2) in the worst case.
 *
 * Step 3 - once we find a true start, walk forward (num+1, num+2, ...)
 * as long as each next number exists in the set, counting the streak
 * length as we go. Keep the best streak seen across all starts.
 *
 * VISUAL WALKTHROUGH for nums = [100, 4, 200, 1, 3, 2]
 * ---------------------------------------------------------------------
 *
 *   numSet = { 100, 4, 200, 1, 3, 2 }   (order doesn't matter in a Set)
 *
 *   number line view - dots are numbers present in the set:
 *
 *     1   2   3   4                 100                 200
 *     ●───●───●───●                  ●                    ●
 *     └───────────┘                  │                    │
 *      one consecutive run       isolated,             isolated,
 *      (needs a starting point)   run length 1          run length 1
 *
 *   checking each number as a possible START (is num-1 missing?):
 *
 *     num=100: is 99 in set? NO  -> valid start! walk: 100 -> 101? no
 *              streak = 1                          longest = max(0,1)=1
 *
 *     num=4:   is 3 in set? YES -> not a start, skip (part of a run
 *                                   that starts earlier)
 *
 *     num=200: is 199 in set? NO -> valid start! walk: 200 -> 201? no
 *              streak = 1                          longest = max(1,1)=1
 *
 *     num=1:   is 0 in set? NO  -> valid start! walk forward:
 *                1 -> is 2 in set? yes -> currentNum=2, streak=2
 *                2 -> is 3 in set? yes -> currentNum=3, streak=3
 *                3 -> is 4 in set? yes -> currentNum=4, streak=4
 *                4 -> is 5 in set? no  -> stop walking
 *              streak = 4                          longest = max(1,4)=4
 *
 *     num=3:   is 2 in set? YES -> skip (already covered by the walk from 1)
 *     num=2:   is 1 in set? YES -> skip (already covered by the walk from 1)
 *
 *   final answer: longest = 4   (the run 1-2-3-4)
 *
 * Time:  O(n)  - each number is added to the set once, and every
 *        number is only ever "walked forward" from as part of exactly
 *        one true run (the skip check prevents re-walking the same run).
 * Space: O(n)  - the Set stores up to n numbers.
 */
function longestConsecutive(nums) {
  const numSet = new Set(nums); // dedupe + O(1) average membership checks
  let longest = 0;

  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      // num-1 is missing, so num is the START of a run - only start
      // counting from here, never from the middle of a run.
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
