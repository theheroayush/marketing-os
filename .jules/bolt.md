## 2024-08-02 - Chat rendering bottleneck
**Learning:** `parseMd` function is called continuously for every chat message re-render without memoization, leading to repeated O(N) string processing.
**Action:** Use a bounded `Map` with Least Recently Used (LRU) eviction strategy to cache markdown transformations.
