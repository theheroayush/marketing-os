
## 2024-04-24 - Storage JSON.parse Bottleneck
**Learning:** In highly interactive applications, repeatedly reading and parsing JSON strings from `localStorage` (like `getSessions` and `getProfiles` being called frequently on every view render) introduces significant overhead because `JSON.parse` is synchronous and blocks the main thread. Browsers cache `getItem()` string results, but parsing is always fresh and slow.
**Action:** Implement an in-memory variable cache for the parsed objects (`_sessionsCache` and `_profilesCache`). Ensure that getters return a deep/shallow clone (using array map + spread operator) of the cache so that UI mutations do not pollute the cache unintentionally. Update cache simultaneously when `localStorage` is updated.
