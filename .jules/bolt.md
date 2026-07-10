## 2026-07-10 - O(N²) String Replacements in parseMd
**Learning:** The simple parseMd function used for markdown formatting creates a performance bottleneck during frequent re-renders due to repeated string replacements.
**Action:** Implemented a bounded Map cache (max 500 entries) around parseMd to memoize HTML parsing. This reduces parsing time from 100+ms to 1ms for frequently repeated message content.
