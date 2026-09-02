/**
 * REMOVE LINKED LIST ELEMENTS
 * ---------------------------------------------------------------------
 * Problem: Given the head of a singly linked list and a value `val`,
 * remove every node whose val equals `val` and return the new head.
 *
 * Approach: the awkward part is that matching nodes can appear anywhere,
 * including at the very front, possibly several in a row. A `dummy`
 * node placed before head removes that special case - the real head is
 * now just "dummy.next" and can be deleted like any other node.
 *
 * Walk with `current` starting at dummy and always look one node ahead:
 *   - if current.next.val === val, splice it out
 *     (current.next = current.next.next) and DON'T advance - the node
 *     now in that slot might also need removing.
 *   - otherwise advance current.
 * Return dummy.next, which reflects any change to the front of the list.
 *
 * VISUAL WALKTHROUGH for list = 1 -> 2 -> 6 -> 3 -> 6 -> null, val = 6
 * ---------------------------------------------------------------------
 *
 *   dummy -> 1 -> 2 -> 6 -> 3 -> 6 -> null
 *
 *   current=dummy, next=1   keep   -> advance: current = 1
 *   current=1,     next=2   keep   -> advance: current = 2
 *   current=2,     next=6   match  -> splice:  2 -> 3 -> 6
 *   current=2,     next=3   keep   -> advance: current = 3
 *   current=3,     next=6   match  -> splice:  3 -> null
 *   current=3,     next=null       -> loop ends
 *
 *   return dummy.next  ->  1 -> 2 -> 3 -> null
 *
 * Time:  O(n)  - single pass, each node inspected once.
 * Space: O(1)  - dummy node plus one pointer, rewired in place.
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  let dummy = new ListNode(0);
  dummy.next = head;
  let current = dummy;
  while (current.next !== null) {
    if (current.next.val == val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return dummy.next;
};
