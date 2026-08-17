/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;

  const need = new Map();
  for (const ch of s1) {
    need.set(ch, (need.get(ch) || 0) + 1);
  }

  const window = new Map();
  let left = 0;

  for (let right = 0; right < s2.length; right++) {
    const c = s2[right];
    window.set(c, (window.get(c) || 0) + 1);

    if (right - left + 1 > s1.length) {
      const leftChar = s2[left];
      window.set(leftChar, window.get(leftChar) - 1);
      if (window.get(leftChar) === 0) {
        window.delete(leftChar);
      }
      left++;
    }

    if (mapsEqual(need, window)) {
      return true;
    }
  }

  return false;
}

function mapsEqual(need, window) {
  if (need.size !== window.size) return false;
  for (const [ch, count] of need) {
    if (window.get(ch) !== count) return false;
  }
  return true;
}
