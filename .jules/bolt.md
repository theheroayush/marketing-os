## 2024-08-09 - Memoizing Markdown Parsing in Vanilla JS
**Learning:** Repetitive string replacement via regex (like `parseMd` replacing formatting tags) introduces unnecessary O(N) traversal overhead on every render cycle. When dealing with static message history that is re-rendered frequently, this overhead compounds and blocks the main thread.
**Action:** Implement an LRU bounded in-memory `Map` cache for expensive string replacement operations to ensure constant O(1) time lookups on re-renders while preventing memory leaks over long sessions.
