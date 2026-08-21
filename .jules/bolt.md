## 2026-08-21 - LocalStorage Caching
**Learning:** Caching localStorage requires deep copies on read/write to prevent mutations, and a storage event listener for cross-tab synchronization.
**Action:** Use structuredClone() and window.addEventListener("storage") when caching.
