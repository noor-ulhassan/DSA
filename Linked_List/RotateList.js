/**
 * ROTATE LIST
 * ---------------------------------------------------------------------
 * Problem: Given the head of a singly linked list, rotate the list to
 * the right by `k` places. Rotating right by 1 means the last node
 * becomes the new head and everything else shifts down by one.
 *
 * Approach: the trick is that rotating right by k is the same as
 * "cutting" the list at a single point and swapping the two halves.
 * After rotating, the new head is the node at position (length - k)
 * from the start (0-indexed), and the node just before it becomes the
 * new tail.
 *
 * Steps:
 *   1. Walk to the end to measure `length` and grab the current `tail`.
 *   2. Reduce k with k % length - rotating by a full length is a no-op,
 *      so only the remainder matters. If that's 0, nothing changes.
 *   3. Close the list into a ring by pointing tail.next back at head.
 *   4. From head, step forward (length - k - 1) times to land on the
 *      node that should become the new tail.
 *   5. newHead = newTail.next, then break the ring with newTail.next = null.
 *
 * VISUAL WALKTHROUGH for list = 1 -> 2 -> 3 -> 4 -> 5 -> null, k = 2
 * ---------------------------------------------------------------------
 *
 *   measure:  length = 5, tail = 5
 *   k = 2 % 5 = 2   (not zero, so we rotate)
 *
 *   close ring:  1 -> 2 -> 3 -> 4 -> 5 -+
 *                ^________________________|
 *
 *   stepToNewTail = length - k = 3
 *   walk (3 - 1) = 2 steps from head:  1 -> 2 -> 3
 *                                                ^ newTail = 3
 *
 *   newHead = newTail.next = 4
 *   newTail.next = null   ->  breaks the ring after node 3
 *
 *   final list:  4 -> 5 -> 1 -> 2 -> 3 -> null
 *
 * Time:  O(n)  - one pass to measure, at most one more partial pass to
 *        reach the new tail.
 * Space: O(1)  - only a handful of pointers, list rewired in place.
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (head == null || head.next == null || k == null) return head;

  let length = 1;
  let tail = head;
  while (tail.next !== null) {
    tail = tail.next;
    length++;
  }

  k = k % length;
  if (k === 0) return head;
  tail.next = head;

  let stepToNewTail = length - k;
  let newTail = head;
  for (let i = 0; i < stepToNewTail - 1; i++) {
    newTail = newTail.next;
  }

  const newHead = newTail.next;
  newTail.next = null;

  return newHead;
};
