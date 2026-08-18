# Two Pointers

This category covers problems solved using the "Two Pointers" technique.

## Core Concepts

The two-pointer technique involves maintaining two separate indices (pointers) that traverse a data structure simultaneously. It is predominantly used on strings, arrays, or linked lists.

By strategically moving the pointers based on specific conditions, we can find pairs or subarrays without needing nested loops, often bringing an `O(n^2)` complexity down to `O(n)`.

## Common Patterns

1. **Opposite Ends**: Placing one pointer at the start and the other at the end of a sorted array or string. They move inward towards each other based on comparisons (e.g., Two Sum on a sorted array, reversing a string, Container with Most Water).
2. **Same Direction**: Both pointers start at the same end but move at different speeds or intervals. Often one pointer acts as an iterator while the other points to the position where the next valid element should go (e.g., removing duplicates from a sorted array).

This technique relies heavily on the sequence being sorted or having monotonic properties that guide the pointer movements predictably.
