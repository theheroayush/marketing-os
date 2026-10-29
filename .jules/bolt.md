## 2026-10-13 - Pre-compute Search Strings
**Learning:** During array filtering, doing repetitive property accesses and string operations (like `.toLowerCase()`) on thousands of objects per keystroke causes noticeable main-thread lag.
**Action:** Pre-compute and cache search strings for objects during initialization, turning `O(N * keys_checked * string_len)` on every search iteration into a single `O(1)` string `.includes()` lookup.

## 2026-10-13 - In-memory Storage Caching
**Learning:** Repetitive localStorage reads (like JSON.parse on every getSessions/getProfiles call) and writes during rendering cause noticeable main-thread lag due to synchronous disk I/O and JSON serialization overhead.
**Action:** Always cache frequently accessed localStorage data in memory using lazy initialization, and update both the in-memory cache and localStorage simultaneously during write operations.
