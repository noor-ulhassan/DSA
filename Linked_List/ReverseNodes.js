/**
 * REVERSE NODES IN K-GROUP
 * ---------------------------------------------------------------------
 * Problem: Given the head of a linked list, reverse the nodes k at a
 * time and return the modified list. If the number of nodes left over
 * at the end is fewer than k, leave that final chunk as-is. Nodes
 * themselves are rewired in place - only `next` pointers change.
 *
 * Approach: process the list one group of k at a time, keeping a
 * pointer to the node that sits JUST BEFORE the current group so the
 * reversed chunk can be stitched back onto the part already done. A
 * `dummy` node in front of head gives that "node before" a value even
 * for the very first group.
 *
 * For each group:
 *   1. groupEnd = getKthNode(nodeBeforeGroup, k) - walk k steps. If it
 *      returns null there are fewer than k nodes remaining, so we stop
 *      and leave the tail untouched.
 *   2. Remember nextGroupStart = groupEnd.next (the boundary) and
 *      groupStart = nodeBeforeGroup.next (soon to become the group's
 *      tail).
 *   3. Reverse the k nodes using the classic prev/current/saveNext
 *      walk, but SEED prev with nextGroupStart instead of null - this
 *      makes the last reversed node point straight at the next group,
 *      so no separate reconnect step is needed on that side.
 *   4. Reconnect the front: nodeBeforeGroup.next = groupEnd (the new
 *      first node of the reversed chunk).
 *   5. Advance: nodeBeforeGroup = groupStart (the chunk's new tail) and
 *      loop for the next group.
 *
 * VISUAL WALKTHROUGH for list = 1 -> 2 -> 3 -> 4 -> 5, k = 2
 * ---------------------------------------------------------------------
 *
 *   dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> null
 *   nodeBeforeGroup = dummy
 *
 *   --- group 1 ---
 *   groupEnd = 2   nextGroupStart = 3   groupStart = 1
 *   reverse [1,2] with prev seeded as 3:
 *       1.next = 3        (1 now tails into the next group)
 *       2.next = 1
 *   nodeBeforeGroup.next = groupEnd(2)  ->  dummy -> 2 -> 1 -> 3 -> 4 -> 5
 *   nodeBeforeGroup = groupStart(1)
 *
 *   --- group 2 ---
 *   groupEnd = 4   nextGroupStart = 5   groupStart = 3
 *   reverse [3,4] with prev seeded as 5:
 *       3.next = 5
 *       4.next = 3
 *   nodeBeforeGroup(1).next = groupEnd(4) -> dummy -> 2 -> 1 -> 4 -> 3 -> 5
 *   nodeBeforeGroup = groupStart(3)
 *
 *   --- group 3 ---
 *   getKthNode(3, 2) walks 3 -> 5 -> null, returns null  ->  break
 *   node 5 (the lone leftover) stays as-is
 *
 *   return dummy.next  ->  2 -> 1 -> 4 -> 3 -> 5 -> null
 *
 * Time:  O(n)  - getKthNode walks each node once and the reversal walks
 *        each node once, so every node is touched a constant number of
 *        times overall.
 * Space: O(1)  - dummy node plus a fixed set of pointers, reversed in
 *        place with no recursion or extra lists.
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
var reverseKGroup = function (head, k) {
  const dummy = new ListNode(0);
  dummy.next = head;

  let nodeBeforeGroup = dummy;

  while (true) {
    const groupEnd = getKthNode(nodeBeforeGroup, k);
    if (groupEnd === null) break;

    const nextGroupStart = groupEnd.next;
    const groupStart = nodeBeforeGroup.next;

    let prev = nextGroupStart;
    let current = groupStart;
    while (current !== nextGroupStart) {
      const saveNext = current.next;
      current.next = prev;
      prev = current;
      current = saveNext;
    }

    nodeBeforeGroup.next = groupEnd;
    nodeBeforeGroup = groupStart;
  }

  return dummy.next;
};

function getKthNode(startNode, k) {
  let node = startNode;
  while (node !== null && k > 0) {
    node = node.next;
    k--;
  }
  return node;
}
