
## 2026-04-29 - [Eliminate Redundant JSON.parse with In-Memory Caching]
**Learning:** Optimizing repeated synchronous `localStorage` reads containing large JSON objects (like complex chat sessions) by avoiding `JSON.parse()`. Since browsers cache `localStorage.getItem()` string results, the real bottleneck is the parse operation itself.
**Action:** Implemented caching for the parsed JavaScript objects inside the module (`_sessionsCache`, `_profilesCache`). Crucially, returned shallow clones (mapping the array and spreading the objects) instead of direct references from getters, ensuring that callers who mutate state don't corrupt the cache.
