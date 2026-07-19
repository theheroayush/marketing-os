## 2024-07-19 - Pure function memoization in Vanilla JS
**Learning:** Frequent UI re-renders in this vanilla JS application cause pure parsing functions like parseMd to become O(N²) string replacement bottlenecks.
**Action:** Use bounded in-memory caches (e.g., Map) with a Least Recently Used (LRU) eviction strategy for expensive pure functions.
