## 2024-07-31 - Vanilla JS Re-render Bottlenecks
**Learning:** Frequent UI re-renders in this vanilla JS architecture cause O(N²) string replacement bottlenecks for pure parsing functions like `parseMd`.
**Action:** Use bounded in-memory LRU caches (via Map) for pure parsing functions to prevent UI threading blocking during frequent DOM updates.
