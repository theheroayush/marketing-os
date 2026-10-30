## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.

## 2026-10-30 - In-Memory Caching for Storage Managers
**Learning:** During continuous application updates, reading repetitively from `localStorage` forces redundant synchronous disk I/O and expensive `JSON.parse` operations that block the main thread and impact render times.
**Action:** Implement an in-memory cache variable (`_cachedSessions`, `_cachedProfiles`) that is populated once on the first access and updated whenever modifications are saved to `localStorage`, changing multiple parse hits to O(1) memory accesses.
