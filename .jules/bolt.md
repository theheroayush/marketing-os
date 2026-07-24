## 2024-07-24 - Cache pure parsing functions in UI re-renders
**Learning:** Frequent UI re-renders call pure parsing functions (like parseMd) repeatedly on identical strings, creating an O(N²) string replacement bottleneck.
**Action:** Use a bounded in-memory cache (like Map) with an LRU eviction strategy to store parsed outputs, avoiding capacity exhaustion while minimizing redundant parsing during re-renders.
