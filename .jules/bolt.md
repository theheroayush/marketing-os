## 2026-09-12 - Pre-computing Search Strings for List Filtering
**Learning:** Optimizing frontend list filtering in vanilla JS inside the render loop causes performance bottlenecks when dynamically calling string allocation and `.toLowerCase()` on multiple properties.
**Action:** Pre-compute a concatenated search string during initialization to reduce operations during the filter loop. Separate the fields using a delimiter (e.g., `|`) to prevent false cross-field matching, and default missing properties to empty strings.
