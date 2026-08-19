## 2024-05-15 - Initial
**Learning:** Need to document critical learnings.
**Action:** Starting the journal.

## $(date +%Y-%m-%d) - Optimize localStorage JSON.parse overhead
**Learning:** Found that repeated calls to `JSON.parse(localStorage.getItem('marku_sessions'))` and `JSON.parse(localStorage.getItem('marku_profiles'))` inside `Storage.getSessions` and `Storage.getProfiles` create a large overhead during UI rendering, since the object payload is large and queried frequently. Naive in-memory caching will break cross-tab sync so a `storage` event listener is required, and returning `structuredClone()` ensures we return independent references just like `JSON.parse` does natively.
**Action:** Always implement in-memory caching for large `localStorage` items accessed multiple times per render, returning a deep copy (e.g. `structuredClone()`) and hooking up a `storage` listener to handle external updates.
