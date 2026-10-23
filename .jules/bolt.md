## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.
## 2024-10-23 - In-Memory Caching for Synchronous Storage Access
**Learning:** The application heavily relies on synchronous `localStorage` operations for core entities (sessions, profiles, activeProfile) in the main rendering paths. Due to the lack of an in-memory cache, identical `JSON.parse(localStorage.getItem(...))` calls are executed repeatedly across UI renders and data updates, blocking the main thread and slowing down the UI interaction.
**Action:** Implement a local in-memory cache within the `Storage` wrapper object to avoid redundant disk I/O and JSON parsing for frequently accessed state, improving UI rendering performance, especially for components like `renderHistoryView` or session resumption.
