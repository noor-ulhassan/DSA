/**
 * REMOVE DUPLICATES FROM SORTED LIST
 * ---------------------------------------------------------------------
 * Problem: Given the head of a SORTED singly linked list, delete all
 * nodes that have a duplicate value so every value appears only once,
 * and return the list still sorted.
 *
 * Approach: because the list is sorted, any duplicates are always
 * adjacent, so a single walk is enough. Keep one `current` pointer and
 * compare it with `current.next`:
 *   - if the two values match, unlink the next node
 *     (current.next = current.next.next) but DON'T advance current -
 *     there may be a whole run of equal values to skip.
 *   - if they differ, advance current to move on.
 * The head never changes (the first node of each value is the one that
 * survives), so we just return the original head.
 *
 * VISUAL WALKTHROUGH for list = 1 -> 1 -> 2 -> 3 -> 3 -> null
 * ---------------------------------------------------------------------
 *
 *   current=1, next=1   equal   -> unlink next:  1 -> 2 -> 3 -> 3
 *   current=1, next=2   differ  -> advance:      current = 2
 *   current=2, next=3   differ  -> advance:      current = 3
 *   current=3, next=3   equal   -> unlink next:  ... 3 -> null
 *   current=3, next=null        -> loop ends
 *
 *   final list:  1 -> 2 -> 3 -> null
 *
 * Time:  O(n)  - each node is visited once.
 * Space: O(1)  - in-place pointer rewiring, one pointer used.
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  let current = head;
  while (current !== null && current.next !== null) {
    if (current.val === current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return head;
};
