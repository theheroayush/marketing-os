## 2024-05-24 - Memoize pure parsing functions to reduce UI re-render bottlenecks
**Learning:** During frequent UI re-renders, O(N²) string replacement operations within `parseMd` can become a significant performance bottleneck.
**Action:** Use a bounded in-memory cache (like `Map`) for pure parsing functions (e.g., `parseMd`) to avoid redundant parsing and improve re-render performance, ensuring to limit the cache size to prevent memory leaks.
