/**
 * ROMAN TO INTEGER
 * ---------------------------------------------------------------------
 * Problem: Given a roman numeral, convert it to an integer.
 * Roman numerals are represented by seven different symbols: 
 * I, V, X, L, C, D and M.
 * 
 * Best approach (used here): Iterate from left to right.
 * Normally, we just add the value of the current symbol to the total.
 * However, if the current symbol has a smaller value than the next symbol
 * (e.g., 'I' before 'V' in "IV"), it means subtraction.
 * Instead of adding it, we subtract its value from the total.
 * 
 * VISUAL WALKTHROUGH for s = "MCMXCIV"
 * ---------------------------------------------------------------------
 * 
 *   Symbol Values: M:1000, C:100, X:10, V:5, I:1
 * 
 *   [ M,  C,  M,  X,  C,  I,  V ]
 *     ▲
 *     1000. Next is C (100). 1000 >= 100.
 *     Action: Add 1000.  Total: 1000.
 * 
 *   [ M,  C,  M,  X,  C,  I,  V ]
 *         ▲
 *     100. Next is M (1000). 100 < 1000.
 *     Action: Subtract 100. Total: 1000 - 100 = 900.
 * 
 *   [ M,  C,  M,  X,  C,  I,  V ]
 *             ▲
 *     1000. Next is X (10). 1000 >= 10.
 *     Action: Add 1000. Total: 900 + 1000 = 1900.
 * 
 *   [ M,  C,  M,  X,  C,  I,  V ]
 *                 ▲
 *     10. Next is C (100). 10 < 100.
 *     Action: Subtract 10. Total: 1900 - 10 = 1890.
 * 
 *   [ M,  C,  M,  X,  C,  I,  V ]
 *                     ▲
 *     100. Next is I (1). 100 >= 1.
 *     Action: Add 100. Total: 1890 + 100 = 1990.
 * 
 *   [ M,  C,  M,  X,  C,  I,  V ]
 *                         ▲
 *     1. Next is V (5). 1 < 5.
 *     Action: Subtract 1. Total: 1990 - 1 = 1989.
 * 
 *   [ M,  C,  M,  X,  C,  I,  V ]
 *                             ▲
 *     5. No next symbol.
 *     Action: Add 5. Total: 1989 + 5 = 1994.
 * 
 * Time:  O(n) - where n is the length of the string.
 * Space: O(1) - we only use a hash map of fixed size (7 symbols).
 *
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
  const romanMap = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
  };
  
  let total = 0;
  
  for (let i = 0; i < s.length; i++) {
    const currentVal = romanMap[s[i]];
    const nextVal = romanMap[s[i + 1]];
    
    if (nextVal && currentVal < nextVal) {
      total -= currentVal;
    } else {
      total += currentVal;
    }
  }
  
  return total;
};
