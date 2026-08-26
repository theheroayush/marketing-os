## 2026-08-26 - Optimize Search Filtering via Pre-computed Lowercase Strings
**Learning:** In vanilla JS, calling string operations like `.toLowerCase()` dynamically on multiple object properties inside a frequent filter loop (e.g. per keystroke during search) allocates many short-lived strings and blocks the main thread, leading to UI jank.
**Action:** When filtering objects based on search queries, always pre-compute a concatenated, lowercased `_searchString` property on the objects during the initialization phase to avoid redundant string allocations in the render loop.
