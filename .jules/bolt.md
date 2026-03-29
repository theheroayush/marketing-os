## 2024-08-16 - Repeated localStorage JSON parsing bottleneck
**Learning:** Found a major performance bottleneck where every view navigation triggered multiple synchronous reads to `localStorage` and `JSON.parse` operations for profiles and sessions. This blocked the main thread significantly on route changes.
**Action:** Implemented a simple in-memory cache variable (`Storage._cache`) that stores parsed objects on first read and updates on subsequent writes, avoiding expensive `JSON.parse` operations during frequent navigation.
