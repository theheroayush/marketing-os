## 2024-08-11 - LocalStorage In-Memory Caching
**Learning:** Frequent JSON.parse(localStorage.getItem(...)) is an expensive operation and synchronous bottleneck in this vanilla JS codebase. However, naive in-memory caching will break cross-tab synchronization unless `storage` events are handled.
**Action:** Implement LRU caching with cross-tab syncing to speed up frequent profile/session retrievals, or fallback to simple single-tab caching if multi-tab isn't critical.
