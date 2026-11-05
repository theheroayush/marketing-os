## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.

## 2026-10-13 - In-Memory Cache for LocalStorage Reads
**Learning:** Calling `localStorage.getItem` and `JSON.parse` synchronously during UI rendering functions (like list views or dashboard renders) causes significant main thread blocking, leading to jank and dropped frames, especially with larger data arrays.
**Action:** Always wrap frequently accessed `localStorage` structures in an in-memory variable cache (e.g., `_sessionsCache`). Ensure you return a `structuredClone` of the cache to avoid reference mutation poisoning the cached object, and attach a `window.addEventListener('storage', ...)` listener to properly invalidate the cache when updates occur in other browser tabs.
