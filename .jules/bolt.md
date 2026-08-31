## 2024-06-25 - LocalStorage Parsing Bottleneck & Single-pass loop

**Learning:** Continuous synchronous `JSON.parse` on `localStorage` blocks the main thread and can degrade performance when doing operations like filtering/mapping across many records. Also, chaining array methods (`map`, `reduce`) causes redundant iteration and memory allocation compared to a single-pass loop.
**Action:** Introduced an in-memory cache for `localStorage` (`_sessionsCache`, `_profilesCache`) to memoize parsed values and updated `getStats` to compute aggregates in a single loop traversal.
