## 2024-05-24 - LocalStorage I/O String Caching
**Learning:** Frequent synchronous reads to `localStorage` block the main thread and degrade performance in vanilla JavaScript apps. Caching parsed objects directly can introduce mutability bugs.
**Action:** Implemented in-memory caching of the raw JSON string and parsed it on demand using `JSON.parse()`. This avoids cross-boundary I/O overhead while preserving state immutability.
