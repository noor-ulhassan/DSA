# Arrays and Hashing

This category covers problems that primarily rely on arrays, hash maps, and hash sets.

## Core Concepts

- **Arrays**: Contiguous memory blocks used for storing collections of elements. They provide fast `O(1)` random access by index but `O(n)` insertions or deletions anywhere except the end.
- **Hash Maps / Hash Tables**: Data structures that provide constant-time `O(1)` average complexity for lookups, insertions, and deletions using key-value pairs. 
- **Hash Sets**: Similar to Hash Maps, but they only store distinct keys without associated values. Excellent for keeping track of elements seen so far to detect duplicates.

## Common Patterns

1. **Frequency Counting**: Using a hash map to count occurrences of elements in an array or string (e.g., Anagrams).
2. **Instant Lookup (The Two Sum pattern)**: Using a hash map to remember past elements to satisfy a target condition without nested loops.
3. **Prefix Sums**: Precomputing cumulative sums to quickly answer queries about subarray sums.
4. **Sequence Tracking**: Using a hash set to group elements and efficiently check for boundaries of consecutive sequences.
5. **Two-Way Mapping (Bijection)**: Using two hash maps to confirm a one-to-one correspondence between two collections in both directions at once (e.g., Word Pattern).
6. **Cycle Detection with a Set**: Recording every value seen while repeatedly transforming a number, so a repeated value signals a loop instead of the process running forever (e.g., Happy Number).

By combining array iterations with hash lookups, we can often reduce a naive `O(n^2)` time complexity down to `O(n)`.
