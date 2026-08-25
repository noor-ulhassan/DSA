/**
 * REVERSE LINKED LIST
 * ---------------------------------------------------------------------
 * Problem: Given the head of a singly linked list, reverse the list
 * in-place and return the new head (what used to be the last node).
 *
 * Approach: walk the list once, re-pointing each node's `next` to the
 * node BEFORE it instead of the node after it. Three references are
 * tracked as we go:
 *   - prev: the node that should come after curr once reversed
 *     (starts as null, since the original head will become the new tail
 *     and must eventually point to nothing)
 *   - curr: the node currently being rewired
 *   - temp: curr's original next node, saved before curr.next is
 *     overwritten, so we don't lose the rest of the list
 *
 * At each step: save curr.next, rewire curr.next to point backward at
 * prev, then slide both prev and curr forward by one node. Once curr
 * runs off the end (becomes null), prev is sitting on the last node
 * visited - which is now the head of the reversed list.
 *
 * VISUAL WALKTHROUGH for list = 1 -> 2 -> 3 -> null
 * ---------------------------------------------------------------------
 *
 *   prev=null  curr=1
 *   null   1 -> 2 -> 3 -> null
 *          ▲
 *        curr
 *   temp = curr.next = 2
 *   curr.next = prev  ->  1 -> null
 *   prev = curr (1)   curr = temp (2)
 *
 *   prev=1  curr=2
 *   null <- 1    2 -> 3 -> null
 *               ▲
 *             curr
 *   temp = curr.next = 3
 *   curr.next = prev  ->  2 -> 1 -> null
 *   prev = curr (2)   curr = temp (3)
 *
 *   prev=2  curr=3
 *   null <- 1 <- 2    3 -> null
 *                    ▲
 *                  curr
 *   temp = curr.next = null
 *   curr.next = prev  ->  3 -> 2 -> 1 -> null
 *   prev = curr (3)   curr = temp (null)
 *
 *   curr is null -> loop ends -> return prev (3)
 *
 *   final list:  3 -> 2 -> 1 -> null
 *
 * Time:  O(n)  - each node is visited and rewired exactly once.
 * Space: O(1)  - only three pointers used, list reversed in place.
 */
var reverseList = function (head) {
  let prev = null; // the new "next" for the node we're about to rewire
  let curr = head; // node currently being rewired

  while (curr !== null) {
    let temp = curr.next; // save the rest of the list before overwriting
    curr.next = prev; // point this node backward
    prev = curr; // move prev forward to this node
    curr = temp; // move curr forward to the saved next node
  }

  return prev; // last node visited is the new head
};
