## 2026-09-14 - Pre-computing Search Strings for List Filtering
**Learning:** Running `.toLowerCase()` on multiple properties of an object inside a filter loop (e.g., in `window.SKILLS.filter`) causes redundant string allocations and degrades performance, especially as the list size grows.
**Action:** Pre-compute a concatenated, lowercased search string (e.g., `_searchString = [name, tagline, desc].join('|').toLowerCase()`) during the initialization phase to optimize the filtering logic and avoid repetitive string operations.
