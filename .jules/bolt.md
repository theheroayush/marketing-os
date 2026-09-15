## 2026-09-15 - Pre-computed Search Strings
**Learning:** In vanilla JS apps with frequent filtering over object lists, dynamically calling `.toLowerCase()` on multiple string properties inside the filter loop causes high CPU usage and garbage collection.
**Action:** Pre-compute a single, delimited, lowercased search string property (e.g., `_searchString = [name, desc].join("|").toLowerCase()`) during initialization to avoid repetitive allocations during search.
