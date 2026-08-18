# Strings

This category covers problems that focus on text manipulation, string parsing, and character algorithms.

## Core Concepts

Strings are often treated as arrays of characters, allowing many array-based algorithms (like Two Pointers or Sliding Window) to be applied directly. However, strings often introduce additional considerations:

- **Immutability**: In many languages (like JavaScript or Python), strings cannot be modified in place. Operations like concatenation or replacing characters may create entirely new strings in memory, leading to hidden `O(n)` time/space costs.
- **Character Encoding**: Understanding ASCII values or character mappings is often crucial (e.g., mapping 'A'-'Z' to indices 0-25).

## Common Patterns

1. **Character Counting**: Using a hash map or a fixed-size array of 26 integers to track the frequency of letters.
2. **Parsing and Evaluation**: Scanning strings from left to right to build numbers, interpret rules, or evaluate expressions (e.g., Roman to Integer).
3. **Palindrome Checks**: Moving pointers from the outside inward, or expanding outwards from the center.
