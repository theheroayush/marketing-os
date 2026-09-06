## 2026-09-06 - Pre-computing Search Strings
**Learning:** In vanilla JS apps with heavy client-side filtering, dynamically calling `.toLowerCase()` on multiple properties inside a `.filter()` loop creates significant performance overhead during search-as-you-type operations.
**Action:** Pre-compute and cache a combined, lowercased `_searchString` property on the objects during initialization to eliminate string allocations and transformations during the render cycle.
