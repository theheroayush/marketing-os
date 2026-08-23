## 2026-08-23 - Pre-compute Search Strings for Performance
**Learning:** Found a common performance bottleneck where `toLowerCase()` and string concatenation were repeatedly called inside a filter loop during user search.
**Action:** Always check if strings that are repeatedly searched can be pre-computed and concatenated into a single property once during initialization (e.g., `_searchString`), significantly reducing string allocations and function calls inside high-frequency filter loops.
