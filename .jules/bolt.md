## 2024-08-06 - Chat Streaming Performance Bottleneck
**Learning:** During chat streaming, the entire message history is re-rendered frequently. The `parseMd` function uses multiple expensive regex replacements and is called on every message on every render tick, causing a major bottleneck for long chats.
**Action:** Implement an LRU cache for pure functions that are called heavily in render loops, especially regex-based string manipulation, to dramatically reduce CPU load.
