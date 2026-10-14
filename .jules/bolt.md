## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.

## 2026-10-14 - Memoizing Expensive String Operations in Render Loops
**Learning:** During chat UI re-renders triggered by frequent events like typing (e.g., input event listeners disabling buttons or recalculating layout), executing intensive regex-based Markdown parsing on large message histories repeatedly blocks the main thread, causing noticeable lag.
**Action:** Always memoize computationally expensive string transformations (like regex parsing) in synchronous render paths. Bound the cache size (e.g., Map with max size 200) to ensure memory stability over long sessions.
