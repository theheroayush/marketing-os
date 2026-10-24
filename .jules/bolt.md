## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.

## 2026-10-13 - Storage Parsing Overhead
**Learning:** Calling `JSON.parse(localStorage.getItem(...))` on frequently accessed application state (like `sessions` and `profiles`) creates unnecessary synchronous disk I/O and CPU overhead, blocking the main thread during frequent read operations (e.g. renders).
**Action:** Implement an in-memory application cache for these frequently accessed `localStorage` values to convert `O(parse)` disk operations to `O(1)` memory lookups. Update the cache reference whenever the underlying storage is modified.
