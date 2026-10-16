## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.
## 2026-10-16 - Markdown Parsing Memoization
**Learning:** Frequent recalculation of regex-based Markdown parsing for chat messages scales poorly during React/DOM re-renders in heavy text applications, causing main thread blocking.
**Action:** Always wrap deterministic string-transformation functions like `parseMd` with a local memory cache (e.g., `new Map()`) to skip execution on unchanged inputs.
