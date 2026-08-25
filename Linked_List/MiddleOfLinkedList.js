/**
 * MIDDLE OF THE LINKED LIST
 * ---------------------------------------------------------------------
 * Problem: Given the head of a singly linked list, return the middle
 * node. If there are two middle nodes (even length), return the second
 * one.
 *
 * Brute-force idea: walk the list once to count its length, then walk
 * it again to the halfway index - correct, but two passes.
 *
 * Better approach (used here): the classic "fast and slow pointers"
 * (tortoise and hare) trick. Both pointers start at head. Each step,
 * `slow` advances one node while `fast` advances two nodes. Since
 * `fast` always covers twice the distance of `slow`, by the time `fast`
 * reaches the end of the list, `slow` has covered exactly half the
 * distance - landing it on the middle node, in a single pass.
 *
 * The loop condition `fast !== null && fast.next !== null` stops fast
 * safely whether the list has odd or even length, and naturally lands
 * slow on the SECOND middle node for even-length lists (since fast
 * needs a full extra pair of steps to run out of room).
 *
 * VISUAL WALKTHROUGH for list = 1 -> 2 -> 3 -> 4 -> 5 -> null
 * ---------------------------------------------------------------------
 *
 *   start:  slow=1  fast=1
 *
 *   step 1: slow = slow.next = 2        fast = fast.next.next = 3
 *           1 -> [2] -> 3 -> 4 -> 5      1 -> 2 -> [3] -> 4 -> 5
 *
 *   step 2: slow = slow.next = 3        fast = fast.next.next = 5
 *           1 -> 2 -> [3] -> 4 -> 5      1 -> 2 -> 3 -> 4 -> [5]
 *
 *   check loop: fast=5, fast.next=null -> stop
 *
 *   return slow -> node 3   (the true middle of 5 nodes)
 *
 *   Even-length example, list = 1 -> 2 -> 3 -> 4 -> null:
 *     start: slow=1 fast=1
 *     step1: slow=2  fast=3
 *     check: fast=3, fast.next=4 (not null) -> continue
 *     step2: slow=3  fast = fast.next.next = null
 *     check: fast=null -> stop
 *     return slow -> node 3   (the SECOND of the two middle nodes 2,3)
 *
 * Time:  O(n)  - fast traverses the list once (slow trails behind it).
 * Space: O(1)  - only two pointers, no extra structures.
 */
var middleNode = function (head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next; // advances one node at a time
    fast = fast.next.next; // advances two nodes at a time
  }

  return slow; // fast covered 2x the distance, so slow lands on the middle
};
