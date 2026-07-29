## 2024-05-15 - Memoizing Markdown Parsing
**Learning:** Frequent pure-function execution (like regex-based markdown parsing) during UI re-renders causes avoidable main thread blocking. Bounded LRU caching with `Map` provides a performant, memory-safe optimization.
**Action:** Always consider memoizing expensive pure functions in render paths, using simple LRU `Map` caches (delete and re-add for recency) to limit memory growth.
