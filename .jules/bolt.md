## 2026-06-09 - Array Filter Optimization
**Learning:** V8 optimizes string operations but chaining `.toLowerCase().includes()` multiple times per array iteration on properties that aren't even required (due to failed early conditions) is a significant bottleneck.
**Action:** Always structure filter callbacks to evaluate inexpensive exact matches (like categories or booleans) first, and return early before allocating strings for case-insensitive searches.
