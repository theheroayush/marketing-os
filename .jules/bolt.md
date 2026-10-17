## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.

## 2026-10-17 - Cache Parsed LocalStorage Objects
**Learning:** Repeated `JSON.parse` of large objects (like chat sessions) from `localStorage` blocks the main thread and significantly slows down rendering.
**Action:** Always wrap `localStorage` access for frequently queried large objects with an in-memory cache, converting repeated `O(N)` parse operations to `O(1)` memory lookups.
