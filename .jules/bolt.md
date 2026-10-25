## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.

## 2026-10-25 - Cache localStorage
**Learning:** Repetitive synchronous disk I/O from `JSON.parse(localStorage.getItem(...))` on frequently accessed data blocks the UI thread during renders.
**Action:** Cache frequently accessed localStorage items (like sessions and profiles) in memory within their respective manager objects to avoid UI blocking disk I/O bottlenecks.
