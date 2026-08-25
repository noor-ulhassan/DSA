# Linked List

This category covers problems built on singly linked lists, where each node holds a value and a reference (`next`) to the following node instead of sitting in contiguous memory.

## Core Concepts

- **Nodes over indices**: there's no random access - reaching the nth node requires walking `n` links from the head. This rules out array-style techniques like binary search unless the list is converted to an array first.
- **In-place rewiring**: because nodes are connected by references, many problems (like reversing a list) can be solved by changing `next` pointers directly, without allocating new nodes.
- **Fast and Slow Pointers**: two pointers traverse the list at different speeds (typically one node at a time vs two). This single-pass technique finds the middle of a list and detects cycles without needing to know the list's length up front.

## Common Patterns

1. **Iterative Reversal**: walking the list once while re-pointing each node's `next` back at the previous node, using a `prev`/`curr`/`temp` trio to avoid losing the rest of the list.
2. **Fast/Slow Traversal (Tortoise and Hare)**: advancing a `slow` pointer by one node and a `fast` pointer by two. When `fast` runs out of list, `slow` is sitting on the middle. When the list has a cycle, `fast` eventually laps `slow` and lands on the same node.

Because there's no O(1) "jump to index" like arrays offer, most linked list solutions come down to choosing the right pointer strategy to get an O(n) single pass instead of repeated re-scans.
