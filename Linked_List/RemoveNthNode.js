/**
 * REMOVE NTH NODE FROM END OF LIST
 * ---------------------------------------------------------------------
 * Problem: Given the head of a singly linked list, remove the nth node
 * counting from the END of the list and return the head. It should be
 * done in a single pass (no measuring the length first).
 *
 * Approach: two pointers with a fixed gap. A `dummy` node is placed in
 * front of head so that even removing the real head is handled without
 * a special case. Advance `fast` n+1 steps ahead of `slow`, then move
 * both together until `fast` falls off the end (becomes null). Because
 * the gap is exactly n+1, `slow` now sits on the node JUST BEFORE the
 * one to delete, so `slow.next = slow.next.next` splices it out.
 *
 * Why n+1 and not n: we want `slow` to stop on the predecessor of the
 * target, not the target itself, so we start it one extra step behind.
 *
 * VISUAL WALKTHROUGH for list = 1 -> 2 -> 3 -> 4 -> 5, n = 2
 * ---------------------------------------------------------------------
 *
 *   dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
 *
 *   advance fast n+1 = 3 steps:
 *     slow = dummy        fast = 3
 *
 *   move both until fast is null:
 *     slow = 1   fast = 4
 *     slow = 2   fast = 5
 *     slow = 3   fast = null   -> stop
 *
 *   slow is node 3, the predecessor of node 4 (the 2nd from the end).
 *   slow.next = slow.next.next   ->   3 -> 5
 *
 *   final list:  1 -> 2 -> 3 -> 5 -> null
 *
 * Time:  O(n)  - `fast` traverses the list once, `slow` follows part way.
 * Space: O(1)  - dummy node plus two pointers, no extra structures.
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let fast = dummy;
  let slow = dummy;
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;

  return dummy.next;
};
