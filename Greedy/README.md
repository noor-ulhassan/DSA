# Greedy Algorithms

This category covers problems solved using the Greedy approach.

## Core Concepts

A greedy algorithm solves optimization problems by making the locally optimal choice at each step with the hope of finding a globally optimal solution. 

Greedy algorithms don't look back to reconsider past decisions. Once a choice is made, it is permanent. This makes them highly efficient (often `O(n)` or `O(n log n)`), but they only work for problems where the "greedy choice property" holds true—meaning local optimal choices guarantee a global optimal solution.

## Common Patterns

1. **Interval Scheduling / Overlaps**: Sorting items by their start or end times and picking the maximum number of non-overlapping intervals.
2. **Jump Games**: Keeping track of the maximum reachable distance at every step to see if the end can be reached, or to find the minimum jumps required.
3. **Task Scheduling**: Always executing the most constrained or highest-priority available task first.

Proving that a greedy choice works is often the hardest part; implementing it is usually straightforward.
