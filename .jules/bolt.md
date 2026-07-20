## 2024-07-20 - LRU Cache for Markdown Parsing
**Learning:** Pure parsing functions (like `parseMd`) using string replacements can become O(N²) bottlenecks during frequent UI re-renders in vanilla JS apps.
**Action:** Implement bounded in-memory caching using a `Map` with a Least Recently Used (LRU) eviction strategy to maintain performance in long-lived sessions without memory bloat.
