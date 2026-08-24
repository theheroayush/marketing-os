## 2026-08-24 - Pre-computing Strings for Frontend List Filtering
**Learning:** Running dynamic string allocations and `.toLowerCase()` on multiple object properties inside a filter loop causes unnecessary CPU overhead on every keystroke, especially on large lists.
**Action:** Pre-compute a concatenated, lowercased search string property (e.g., `_searchString`) during the initialization phase and use it for filtering to eliminate redundant O(N) string transformations per keystroke.
