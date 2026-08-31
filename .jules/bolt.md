## 2026-04-08 - [In-memory Caching for localStorage reads]
**Learning:** [Synchronous `localStorage` reads with `JSON.parse` can cause main thread blocking during view navigations, especially for complex or frequent queries like stats calculations which iterate over all sessions.]
**Action:** [Implemented `Storage._cache` in `app.js` to store the parsed objects in memory. The data is updated in memory when it is saved or deleted. This avoids `JSON.parse(localStorage.getItem(...))` on every getter call, reducing execution time significantly (e.g. from ~77ms to ~0.1ms for 1000 calls).]
