/**
 * LINKED LIST CYCLE
 * ---------------------------------------------------------------------
 * Problem: Given the head of a linked list, determine whether it
 * contains a cycle (some node's `next` eventually points back to a
 * node earlier in the list, instead of ending at null).
 *
 * Approach: Floyd's cycle detection ("tortoise and hare"). Two
 * pointers walk the list at different speeds - `slow` moves one node
 * at a time, `fast` moves two. If there's no cycle, `fast` simply runs
 * off the end of the list first (it gets there twice as fast) and we
 * can safely say "no cycle". If there IS a cycle, both pointers end up
 * looping inside it forever - and because `fast` gains on `slow` by
 * one extra step every iteration, it's guaranteed to eventually LAP
 * `slow` and land on the exact same node, which is the signal a cycle
 * exists.
 *
 * This version starts `fast` one node ahead (at head.next) instead of
 * at head itself - just a starting offset variant of the same idea, so
 * the two pointers aren't compared as trivially equal on the very
 * first check.
 *
 * The loop guard `slow !== null || fast !== null` looks unusual (an OR
 * rather than an AND), but it behaves correctly: since `fast` always
 * moves faster, on an acyclic list `fast` (or fast.next) is guaranteed
 * to hit null before `slow` ever could - and that's caught immediately
 * by the `fast == null || fast.next == null` check inside the loop,
 * which returns false before `slow` running out would matter.
 *
 * VISUAL WALKTHROUGH for a cyclic list: 3 -> 2 -> 0 -> -4 -> (back to 2)
 * ---------------------------------------------------------------------
 *
 *        3 -> 2 -> 0 -> -4
 *             ▲___________|
 *
 *   start:  slow=3   fast=2 (head.next)
 *
 *   step 1: fast(2) not null, fast.next(0) not null, fast(2) != slow(3)
 *           slow = slow.next = 2         fast = fast.next.next = -4
 *
 *   step 2: fast(-4) not null, fast.next(2) not null, fast(-4) != slow(2)
 *           slow = slow.next = 0         fast = fast.next.next = 0
 *
 *   step 3: fast(0) not null, fast.next(-4) not null, fast(0) == slow(0)!
 *           -> return true, a cycle exists
 *
 *   For an acyclic list like 1 -> 2 -> 3 -> null, fast would instead
 *   hit fast.next === null partway through and return false right away.
 *
 * Time:  O(n)  - if there's no cycle, fast reaches the end in ~n/2
 *        steps. If there is one, fast catches slow within one full
 *        loop around the cycle.
 * Space: O(1)  - just two pointers, no extra structures.
 */
var hasCycle = function (head) {
  if (head == null) {
    return false;
  }
  let slow = head;
  let fast = head.next;
  while (slow !== null || fast !== null) {
    if (fast == null || fast.next == null) {
      return false;
    }

    if (fast == slow) {
      return true;
    }
    slow = slow.next;
    fast = fast.next.next;
  }
  return false;
};
