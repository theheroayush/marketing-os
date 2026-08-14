## 2025-02-14 - Lazy evaluate individual search fields for fast filtering
**Learning:** Repetitive string manipulations like `toLowerCase()` inside tight frontend render loops (like search filters on every keystroke) can significantly degrade performance (O(N) allocations).
**Action:** Lazy-evaluate and cache the individual lowercased string fields on the model itself during the first filter execution to avoid repeating expensive string operations on subsequent keystrokes, while keeping cross-boundary isolation intact.
