## 2024-05-18 - Storage reads block rendering
**Learning:** Synchronous `localStorage` reads and JSON parsing in `app.js` block the main thread and can slow down rendering when opening the dashboard or switching views.
**Action:** Implemented an in-memory cache (`Storage._cache`) to avoid re-parsing and reading the same items on every navigation.