## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.

## 2026-10-28 - Cache Storage Methods
**Learning:** Repetitive synchronous `localStorage` disk I/O and `JSON.parse` operations within frequently called getter methods create significant main-thread blocking bottlenecks during application renders.
**Action:** Implement in-memory caching variables (e.g., `cachedSessions`, `cachedProfiles`) for frequently accessed `localStorage` data, returning the cached version instantly on subsequent calls and only updating the cache and `localStorage` together during writes.
