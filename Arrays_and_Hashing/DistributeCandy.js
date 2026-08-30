/**
 * @param {number[]} candyType
 * @return {number}
 */
var distributeCandies = function (candyType) {
  let unique = new Set(candyType);
  let allowed = candyType.length / 2;

  return Math.min(unique.size, allowed);
};
