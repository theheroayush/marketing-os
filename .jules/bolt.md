## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.

## 2026-10-13 - LocalStorage Parsing Bottlenecks
**Learning:** Frequent synchronous calls to `JSON.parse(localStorage.getItem(...))` on large stringified arrays or objects (like profiles or session lists) during multiple renders can cause significant UI blocking and main-thread lag.
**Action:** Implemented an in-memory caching layer using `structuredClone()` to avoid repeated parsing and cache poisoning by reference mutation, while adding a `window.addEventListener('storage', ...)` listener to properly invalidate caches and maintain multi-tab synchronization.
