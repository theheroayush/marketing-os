
## 2026-07-25 - Caching Markdown Parsers in Vanilla JS
**Learning:** Vanilla JS architectures with frequent UI re-renders (like chat interfaces) can suffer from O(N²) string replacement bottlenecks if pure functions like markdown parsing are un-memoized.
**Action:** Implement bounded in-memory LRU caches (using `Map`) for expensive, frequently called pure functions to preserve fast render times without ballooning memory usage.
