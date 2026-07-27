## 2025-02-27 - Optimize Markdown Parsing with Bounded LRU Cache
**Learning:** Found an O(N²) string replacement bottleneck in `parseMd` during frequent UI re-renders. A naive unbounded cache could lead to memory leaks over long sessions.
**Action:** Implemented a bounded in-memory cache using `Map` with a Least Recently Used (LRU) eviction strategy. Deleting and re-inserting keys on hits maintains insertion order recency, and `map.keys().next().value` allows for efficient O(1) eviction when the capacity (100 items) is reached.
