## 2024-05-24 - Optimizing localStorage Reads
**Learning:** `localStorage.getItem` itself is fast and often cached by modern browsers, but calling `JSON.parse` on large strings in frequent synchronous reads (like `getProfiles` or `getSessions`) causes noticeable CPU spikes and blocks the main thread.
**Action:** Introduced an in-memory caching layer (`_profilesCache`, `_sessionsCache`) in `app.js` that maps to cloned objects on retrieval to prevent reference mutation while eliminating redundant `JSON.parse` calls.
