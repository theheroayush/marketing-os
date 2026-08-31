## 2023-10-27 - [Storage performance bottleneck]
**Learning:** Frequent calls to `Storage.getSessions()` and `Storage.getProfiles()` caused significant synchronous `localStorage` reads and `JSON.parse` operations, blocking the main thread during view navigation and stats rendering.
**Action:** Implemented an in-memory `_cache` inside the `Storage` object to read once from `localStorage`, subsequently serving cached data to prevent main thread blocking, updating it synchronously when writes occur.
