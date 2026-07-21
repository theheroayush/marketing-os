## 2025-07-21 - LRU Caching for Pure Parsing Functions
**Learning:** The `parseMd` function is a pure parsing function that causes O(N²) string replacement bottlenecks during frequent UI re-renders, particularly when rendering chat messages.
**Action:** Implement bounded in-memory caches (like `Map`) with a Least Recently Used (LRU) eviction strategy to optimize pure parsing functions and prevent unbounded memory growth while keeping frequent data accessible.
