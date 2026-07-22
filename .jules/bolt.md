## 2024-05-24 - LRU Cache for Pure Parsing Functions
**Learning:** In this vanilla JS architecture, pure parsing functions like `parseMd` can create O(N²) string replacement bottlenecks during frequent UI re-renders if not cached.
**Action:** Use bounded in-memory caches (like `Map` with LRU eviction) for repetitive string parsing operations to maintain performance without uncontrolled memory growth.
