/**
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
