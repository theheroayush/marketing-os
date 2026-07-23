## 2025-01-20 - Memoizing parseMd for UI rendering
**Learning:** Frequent UI re-renders in vanilla JS can cause O(N²) string replacement bottlenecks if pure parsing functions like `parseMd` are re-evaluated continuously.
**Action:** Implement bounded in-memory LRU caches (e.g., using `Map`) for pure string-processing functions to optimize UI re-render cycles.
