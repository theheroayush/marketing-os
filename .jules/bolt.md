## 2024-05-18 - Optimize parseMd rendering speed
**Learning:** Pure parsing functions like markdown-to-html conversion can become O(N²) string replacement bottlenecks during frequent UI re-renders in vanilla JS applications, since they execute repeatedly on the same unchanging text inputs.
**Action:** Use a bounded in-memory cache (like Map) for pure string conversion utilities to memoize the results, speeding up re-renders while preventing memory leaks.
