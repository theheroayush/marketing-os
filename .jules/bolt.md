# Bolt's Journal

## 2026-10-06 - Pre-computing complex search strings
**Learning:** In vanilla JS apps, filtering large arrays of objects by computing `.toLowerCase()` on multiple fields within the filter loop causes O(N) string allocations per keystroke, leading to UI jank during rapid typing.
**Action:** Pre-compute a single, concatenated lowercased `_searchString` property on the objects during app initialization. Use a distinct delimiter like `|` to prevent cross-field false matches.
