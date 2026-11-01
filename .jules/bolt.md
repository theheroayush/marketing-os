
## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.

## 2023-11-20 - In-Memory Caching for LocalStorage
**Learning:** Repetitive synchronous accesses to `localStorage` coupled with `JSON.parse` during render loops (e.g., when rendering dashboard, skills hub, or chat views) can cause severe main thread blocking and lag in Vanilla JS applications that heavily rely on it for state. However, simple variable caching breaks multi-tab synchronization and exposes the cache to reference mutation (poisoning) if components mutate the returned array.
**Action:** When implementing an in-memory cache for `localStorage`, you must include a `window.addEventListener('storage', ...)` listener to invalidate or update the cache when other tabs modify the data. Additionally, ensure the getter returns a deep clone (e.g., using `structuredClone`) to prevent reference mutation from poisoning the cache.
