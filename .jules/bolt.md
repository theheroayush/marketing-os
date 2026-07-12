## 2023-10-25 - Cache parseMd regex operations
**Learning:** The `parseMd` function uses multiple chained regex string replacements. During frequent UI re-renders of long chat sessions, this creates an O(N²) string replacement bottleneck in this vanilla JS app.
**Action:** Always prefer using a bounded in-memory cache (like `Map`) for pure parsing functions to prevent UI thread blocking.
