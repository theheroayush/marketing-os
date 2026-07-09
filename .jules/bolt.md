## 2024-07-09 - Markdown Parsing Bottleneck in Re-renders
**Learning:** In vanilla JS applications lacking VDOM reconciliation, string processing functions like `parseMd` can become a significant performance bottleneck during chat message re-renders, especially if they execute multiple O(N²) regex replacements over growing message arrays.
**Action:** Implement bounded in-memory caching (`Map`) for pure parsing functions to eliminate redundant string manipulations and guarantee stable frame rates during continuous DOM updates.
