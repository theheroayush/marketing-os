## 2026-09-02 - Pre-computing Search Strings for List Filtering
**Learning:** In vanilla JS list filtering (like `window.SKILLS`), running dynamic string allocations (`.toLowerCase()`) on multiple object properties inside the filter loop causes unnecessary garbage collection pressure and main thread blocking on keystrokes.
**Action:** Pre-compute a concatenated, lowercased `_searchString` property during the initialization phase to reduce O(N * M) string allocations to a single `.includes()` check.
