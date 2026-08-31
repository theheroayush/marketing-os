
## 2024-04-17 - [Cache Storage JSON Parsing]
**Learning:** `localStorage.getItem` returns strings and `JSON.parse` is significantly slower than returning object references. Repeated synchronous reads combined with parsing can cause performance bottlenecks when accessed in many places, like `getProfiles` or `getSessions`.
**Action:** Implemented an in-memory caching mechanism (`_cachedProfiles` and `_cachedSessions`) inside the IIFE scope of `app.js`. The cached objects and mutable properties (like `team` arrays) are deep-copied on return to prevent reference mutations.
