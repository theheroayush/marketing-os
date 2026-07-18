## 2024-07-18 - Bounded Memoization for Pure Parsing Functions
**Learning:** In this vanilla JS architecture, pure parsing functions like parseMd create O(N²) string replacement bottlenecks during frequent UI re-renders (like chat sessions), as the same text is repeatedly parsed.
**Action:** Use a bounded in-memory cache (like Map with a size limit) for string parsing operations to prevent memory leaks while dramatically speeding up frequent re-renders.
