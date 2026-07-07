## 2024-07-28 - In-memory Cache for LocalStorage
**Learning:** Frequent JSON.parse calls on large localStorage data (like chat histories in marku_sessions) on every view render create significant synchronous UI blocks.
**Action:** Always wrap localStorage getters in an in-memory cache variable that is invalidated only on write operations to eliminate repetitive JSON.parse overhead.
