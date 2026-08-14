import collections
import heapq

# TOP K FREQUENT ELEMENTS
# ---------------------------------------------------------------------
# Problem: Given a list of numbers, return the k numbers that appear
# most often. Order of the result doesn't matter.
#
# Step 1 - Count frequencies.
# collections.Counter(nums) walks the list once and builds a dict-like
# object mapping {number: how many times it appeared}. E.g. for
# nums = [1,1,1,2,2,3], count = {1: 3, 2: 2, 3: 1}.
#
# Step 2 - Why a heap instead of just sorting by frequency?
# Sorting all unique numbers by frequency costs O(u log u), where u is
# the number of unique values. Using a "min-heap of size k" instead
# only ever keeps the top k candidates in memory, giving O(u log k) -
# faster when k is much smaller than the number of unique values.
#
# A heap is a data structure that always gives you quick access to the
# SMALLEST item it holds. Python's heapq is a min-heap: heappush adds
# an item and heappop removes/returns the smallest one, both in
# O(log size) time.
#
# The trick: we push (frequency, number) tuples. Tuples compare
# element by element, so the heap orders itself by frequency first.
# We keep pushing every (freq, num) pair, but the moment the heap
# grows past size k, we pop - which removes the CURRENT smallest
# frequency in the heap. That means only the k largest frequencies we've
# seen so far ever survive in the heap; if the newest item was smaller
# than everything already there, it just gets immediately evicted.
#
# By the time we've processed every unique number, the heap contains
# exactly the k numbers with the highest frequencies.
#
# VISUAL WALKTHROUGH for nums = [1,1,1,2,2,3], k = 2
# ---------------------------------------------------------------------
#
#   count = { 1:3, 2:2, 3:1 }        (frequency of each number)
#
#   min-heap capped at size k=2, holding (frequency, number) pairs -
#   picture it as a 2-seat "most frequent" leaderboard:
#
#   push (3,1)   leaderboard: [ 1(freq 3) ]
#                                └── only seat filled
#
#   push (2,2)   leaderboard: [ 1(freq 3) | 2(freq 2) ]
#                                both seats now full, size 2 == k, ok
#
#   push (1,3)   leaderboard TRIES to add 3(freq 1):
#                [ 1(freq 3) | 2(freq 2) | 3(freq 1) ]  <- 3 seats, > k!
#                       weakest freq (1) gets evicted immediately
#                [ 1(freq 3) | 2(freq 2) ]   <- back to 2 seats
#
#   nothing left to process. Final leaderboard survivors:
#     (3,1) and (2,2)  ->  numbers  [ 1, 2 ]
#
#   The heap always keeps the STRONGEST k contenders seen so far and
#   auto-evicts the weakest one whenever a new contender pushes it over
#   capacity - so anything that survives to the end must be top-k.
#
# Time:  O(u log k)  where u = number of unique values in nums.
# Space: O(u) for the counter, O(k) for the heap.
class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        count = collections.Counter(nums)  # number -> frequency

        heap = []  # min-heap of (frequency, number), capped at size k

        for num, freq in count.items():
            heapq.heappush(heap, (freq, num))

            if len(heap) > k:
                # Heap grew too big - evict the current lowest frequency,
                # keeping only the k largest frequencies seen so far.
                heapq.heappop(heap)

        # Whatever survived in the heap are the k most frequent numbers.
        result = []
        for freq, num in heap:
            result.append(num)

        return result