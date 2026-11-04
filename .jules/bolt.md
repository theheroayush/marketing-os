## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.

## 2026-10-14 - In-Memory Cache for localStorage
**Learning:** Repetitive synchronous `JSON.parse` and `localStorage.getItem` operations during frequent re-renders block the main thread and significantly degrade frontend performance.
**Action:** Implemented an in-memory cache using `structuredClone()` to prevent cache poisoning by reference mutation, coupled with a `storage` event listener to invalidate the cache and maintain multi-tab synchronization.
