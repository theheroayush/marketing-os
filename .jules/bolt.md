## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.

## 2026-10-21 - Cached localStorage for improved sync performance
**Learning:** Calling `JSON.parse(localStorage.getItem(...))` sequentially on every state or cache access adds significant overhead in vanilla JS apps where state relies directly on storage APIs. The vanilla architecture lacks global `window` context caching for frequently accessed storage configurations.
**Action:** When a vanilla JS application utilizes local storage heavily for local state management (e.g. `Storage.getSessions()`, `Storage.getProfiles()`), implement memory caching (e.g. `sessionCache`, `profileCache`) to reduce synchronous I/O blocking caused by redundant string parsing and localized variable polling. Update the cache reference whenever a storage item is written or deleted.
