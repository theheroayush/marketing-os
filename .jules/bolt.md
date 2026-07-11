## 2024-05-18 - Optimize Markdown Parsing
**Learning:** Using bounded in-memory caches (like `Map`) for pure parsing functions (e.g., `parseMd`) prevents O(N²) string replacement bottlenecks during frequent UI re-renders in this vanilla JS application.
**Action:** Always implement a bounded cache when performing intensive string manipulations in frequently called rendering functions.
