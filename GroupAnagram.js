/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Map();
  for (let str of strs) {
    const count = new Array(26).fill(0);
    for (let char of str) {
      count[char.charCodeAt(0) - 97]++;
    }
    const signature = count.join("#");
    if (!map.has(signature)) {
      map.set(signature, []);
    }
    map.get(signature).push(str);
  }
  return Array.from(map.values());
};
