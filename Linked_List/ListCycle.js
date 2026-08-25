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
