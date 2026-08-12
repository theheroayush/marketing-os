## 2023-10-24 - Optimize localStorage Access
**Learning:** Repetitive `JSON.parse` on `localStorage` objects (like `getSessions` and `getProfiles`) on every view render can block the main thread and cause micro-stutters. Naive in-memory caching can break cross-tab synchronization.
**Action:** Always implement a `storage` event listener to invalidate the in-memory cache when implementing `localStorage` optimization to ensure cross-tab synchronization.
