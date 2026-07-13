## 2024-11-20 - Markdown Parsing Bottleneck in Vanilla JS Re-renders
**Learning:** In vanilla JS apps that re-render large DOM trees (like entire chat histories), pure parsing functions (`parseMd`) become severe O(N²) bottlenecks due to repetitive Regex string replacements on identical text strings.
**Action:** Always implement a bounded in-memory cache (like `Map`) for pure parsing functions to bypass repeated execution during frequent UI re-renders, reducing time from ~140ms to ~1ms for 10k iterations.
