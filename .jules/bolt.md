## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.

## 2026-10-20 - Storage Caching Optimization
**Learning:** `JSON.parse(localStorage.getItem(...))` is extremely slow when dealing with large datasets like chat history and user profiles. In `app.js`, `Storage.getSessions()` and `Storage.getProfiles()` are called multiple times during renders (e.g. `renderDashboard`), causing significant main thread blocking.
**Action:** Implemented an in-memory cache for `Storage` to avoid redundant parsing and localStorage reads. Added `_sessionCache` and `_profileCache` which are populated on first read and updated alongside writes.
