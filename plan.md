1. **Optimize `Storage.getSessions()` and other Storage reads**
   - The app makes repeated `JSON.parse(localStorage.getItem(...))` calls in functions like `getSessions()`, `getProfiles()`, and when evaluating states (e.g. `getStats()`). Parsing large JSON strings blocking the main thread can be expensive, especially as users get more chat history.
   - Implement an in-memory deep copy cache using `structuredClone()` (to avoid mutating cached values accidentally and breaking freshness), with a `storage` event listener to sync state across tabs.
   - Measure performance by evaluating time spent on `JSON.parse` across tabs.
2. **Pre-commit Instructions**
   - Run the pre-commit script to ensure format and tests are good.
3. **Submit**
   - Create a PR titled `⚡ Bolt: Cache Storage parses with in-memory fallback`.
