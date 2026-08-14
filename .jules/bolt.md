## 2025-02-14 - Lazy evaluate and cache search strings for fast filtering
**Learning:** Repetitive string manipulations like `toLowerCase()` inside tight frontend render loops (like search filters on every keystroke) can significantly degrade performance (O(N) allocations).
**Action:** Lazy-evaluate and cache a combined searchable string on the model itself during the first filter execution to avoid repeating expensive string operations on subsequent keystrokes.
