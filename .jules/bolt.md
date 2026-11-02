## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.

## 2026-10-15 - Cache LocalStorage JSON parsing
**Learning:** Calling `JSON.parse(localStorage.getItem(...))` frequently during render cycles blocks the UI thread because both disk I/O and parsing large JSON strings are synchronous operations.
**Action:** Implement an in-memory variable cache and return `structuredClone(cache)` for reads to guarantee safety against accidental reference mutations from UI code while preserving fast response times. Listen to the `storage` event to invalidate on cross-tab updates.
