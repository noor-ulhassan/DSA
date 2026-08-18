/**
 * MINIMUM JUMPS TO REACH END
 * ---------------------------------------------------------------------
 * Problem: You stand on square 0 of a board with n squares, each square
 * holding a number. In one move you may:
 *   1) Walk to an adjacent square (index - 1 or index + 1), or
 *   2) If the number on your current square is PRIME, teleport to any
 *      other square whose number is a MULTIPLE of that prime.
 * Find the minimum number of moves to reach the last square (index n-1).
 *
 * Why BFS (Breadth-First Search)? "Minimum number of moves" in a graph
 * where every move costs the same (1 move) is exactly what BFS is built
 * for: BFS explores the board wave by wave (all squares reachable in 1
 * move, then all squares reachable in 2 moves, etc.), so the very first
 * time it reaches the target square, that's guaranteed to be the
 * shortest path. Think of it like ripples spreading out from square 0.
 *
 * The queue holds [index, jumpsTakenSoFar] pairs - a to-do list of
 * squares to explore next, in the order they were discovered.
 *
 * Two "visited" sets prevent wasted work:
 *   - visitedIndices: never re-queue a square we've already reached
 *     (we already know the fastest way there, revisiting can't improve it).
 *   - usedPrimes: teleporting via a prime jumps to EVERY multiple of
 *     that prime on the board at once. If we land on another square
 *     sharing that same prime, re-doing the teleport would just
 *     rediscover squares we already handled - so each prime "portal"
 *     is only used once, which keeps this fast even on large inputs.
 *
 * isPrime(n) just checks n has no divisors other than 1 and itself,
 * testing divisors up to sqrt(n) since a factor pair always has one
 * factor <= sqrt(n).
 *
 * VISUAL WALKTHROUGH for nums = [8, 3, 9, 3, 1]   (n=5, target index 4)
 * ---------------------------------------------------------------------
 *
 *   board (index : value):
 *     [0]:8    [1]:3    [2]:9    [3]:3    [4]:1
 *
 *   BFS spreads outward from index 0 in "waves" - like ripples in a
 *   pond. Everything reachable in 1 move lights up first, then
 *   everything reachable in 2 moves, and so on:
 *
 *   wave 0 (0 jumps)         ( 0 )
 *                              │
 *                     walk +1 │   (8 isn't prime, no teleport)
 *                              ▼
 *   wave 1 (1 jump)          ( 1 )  value=3, PRIME!
 *                        ┌─────┴─────┐
 *                walk +1 │           │ teleport: every OTHER multiple
 *                        ▼           │ of 3 on the board
 *   wave 2 (2 jumps)   ( 2 )       ( 3 )  <- index 3 also holds a 3
 *                        │           │
 *              (9 not    │  walk +1  │
 *               prime,   │           ▼
 *               dead end)│   wave 3 (3 jumps)   ( 4 )  <-- TARGET!
 *
 *   queue timeline (each row = one wave of discoveries):
 *     [0]
 *      -> [1]                                  (walked from 0)
 *          -> [2, 3]                            (2 walked from 1,
 *                                                 3 teleported via prime 3)
 *              -> [4]                           (walked from 3)
 *
 *   index 4 is first reached in wave 3  ->  answer = 3 jumps
 *   path taken:  0 --walk--> 1 --teleport(x3)--> 3 --walk--> 4
 *
 * Time:  roughly O(n * sqrt(maxVal) + n^2) worst case - each index is
 *        visited once, prime checks cost sqrt(maxVal), and each unique
 *        prime portal scans the board once for multiples.
 * Space: O(n) for the queue and visited-indices tracking.
 *
 * @param {number[]} nums
 * @return {number}
 */

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function minJumps(nums) {
  const n = nums.length;
  if (n <= 1) return 0; // If the board is 1 square, we are already there!

  // 1. Setup our Breadth-First Search (BFS) tools
  const queue = [[0, 0]]; // Stores: [currentIndex, jumpsTaken]
  let head = 0; // A pointer to read the queue quickly

  // 2. The "Been There, Done That" memory banks
  const visitedIndices = new Set([0]);
  const usedPrimes = new Set();

  // 3. Start the BFS Ripple
  while (head < queue.length) {
    const [currentIdx, jumps] = queue[head];
    head++; // Move to the next item in the queue

    // Did we reach the final square?
    if (currentIdx === n - 1) {
      return jumps;
    }

    // MOVE TYPE 1: The Walking Moves (Left & Right)
    const walkingMoves = [currentIdx - 1, currentIdx + 1];

    for (let nextIdx of walkingMoves) {
      // If it's on the board AND we haven't stepped there yet
      if (nextIdx >= 0 && nextIdx < n && !visitedIndices.has(nextIdx)) {
        visitedIndices.add(nextIdx); // Mark as visited
        queue.push([nextIdx, jumps + 1]); // Add to our queue for the next wave
      }
    }

    // MOVE TYPE 2: The Prime Teleportation

    const val = nums[currentIdx];

    // If we are standing on a prime, AND we haven't used this portal yet
    if (isPrime(val) && !usedPrimes.has(val)) {
      usedPrimes.add(val); // Mark portal as used so we never waste time re-checking it

      // Scan the board for all multiples of this prime
      for (let nextIdx = 0; nextIdx < n; nextIdx++) {
        if (!visitedIndices.has(nextIdx) && nums[nextIdx] % val === 0) {
          visitedIndices.add(nextIdx);
          queue.push([nextIdx, jumps + 1]); // Teleport!
        }
      }
    }
  }

  return -1; // If it's impossible to reach the end
}
