# Sliding Window

This category covers problems that utilize the "Sliding Window" pattern.

## Core Concepts

The sliding window technique is a variation of the two-pointer approach, specifically designed for problems dealing with contiguous subarrays or substrings. 

Instead of looking at independent pairs of elements, we define a "window" using a `left` and `right` pointer. The window captures a sequence of elements and "slides" across the array or string to find an optimal range that satisfies given constraints.

## Common Patterns

1. **Fixed Size Window**: The difference between the right and left pointers remains constant. The window shifts by simultaneously incrementing both pointers by one, adding the new element and dropping the oldest element (e.g., max sum of a subarray of size K).
2. **Variable Size Window**: The right pointer continually expands the window until a constraint is violated. Then, the left pointer shrinks the window until the constraint is satisfied again. This is typically used for finding the longest or shortest subarray meeting certain criteria (e.g., longest substring without repeating characters).

By avoiding recalculation of overlapping elements, sliding window reduces time complexity from `O(n^2)` or `O(n^3)` to `O(n)`.
