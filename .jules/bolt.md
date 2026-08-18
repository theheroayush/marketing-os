## 2026-08-18 - [Optimize localStorage Access]
**Learning:** Repetitive synchronous JSON.parse() on large localStorage items (like sessions and profiles) blocks the main thread and causes UI jank in vanilla JS apps, especially during frequent operations like typing.
**Action:** Implement an LRU in-memory cache using Map with structuredClone() to return deep copies, avoiding repetitive parsing while preserving safe fresh object references and syncing across tabs.
