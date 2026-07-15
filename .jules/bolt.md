## 2026-07-15 - Optimize Markdown Parsing with Bounded Cache
**Learning:** In vanilla JS architectures with frequent DOM re-renders, pure parsing functions like `parseMd` that use multiple regex string replacements become an O(N²) bottleneck for long chat histories.
**Action:** Prefer using bounded in-memory caches (like `Map` limited to 100 entries) for pure parsing functions to prevent string replacement bottlenecks during frequent UI re-renders.
