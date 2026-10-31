## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.

## 2026-10-14 - Cache localStorage accesses
**Learning:** Vanilla JS apps relying heavily on `localStorage` for state management can suffer from main thread blocking due to synchronous disk I/O and `JSON.parse` operations during frequent UI renders.
**Action:** Always introduce an in-memory caching layer (e.g., `Storage._cache`) to store and retrieve frequently accessed state, updating both the cache and `localStorage` simultaneously on writes.
