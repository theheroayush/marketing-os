## 2024-07-16 - Pure Parsing Function Caching
**Learning:** In vanilla JS architectures with frequent UI re-renders, repeated regex operations in pure parsing functions (like `parseMd`) can become a major bottleneck, as observed by a 99% execution time reduction in benchmarks when cached.
**Action:** Prefer using bounded in-memory caches (like `Map`) for pure parsing functions to prevent O(N²) string replacement bottlenecks during frequent UI re-renders.
