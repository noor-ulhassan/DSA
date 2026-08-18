# Heaps (Priority Queues)

This category covers problems that utilize the Heap data structure (often referred to as a Priority Queue).

## Core Concepts

A Heap is a specialized tree-based data structure that satisfies the heap property:
- **Max-Heap**: The parent node is always greater than or equal to its children. The root is the maximum element.
- **Min-Heap**: The parent node is always less than or equal to its children. The root is the minimum element.

Heaps provide `O(1)` access to the largest (or smallest) element, and `O(log n)` time complexity for insertions and deletions. They are typically implemented internally using arrays.

## Common Patterns

1. **Top K Elements**: Using a Min-Heap of size `k` to find the `k` largest elements. When the heap exceeds size `k`, you pop the minimum element. At the end, the heap contains the `k` largest elements.
2. **Merging K Sorted Lists**: Placing the head of each list into a Min-Heap and repeatedly extracting the minimum to build the final sorted result.
3. **Running Median**: Maintaining a Max-Heap for the lower half of numbers and a Min-Heap for the upper half to efficiently find the median of a continuous stream of data.
