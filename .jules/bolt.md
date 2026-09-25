## 2026-09-25 - Pre-compute Search Strings for Vanilla JS Filtering
**Learning:** In vanilla JS apps, filtering lists by dynamically lowering and concatenating properties inside the filter loop (e.g., `s.name.toLowerCase().includes(q) || ...`) causes repetitive string allocations and function calls.
**Action:** Pre-compute a combined search string (e.g., `s._searchString = ${s.name.toLowerCase()}|${s.tagline.toLowerCase()}`) during app initialization to perform a single, fast substring search per item, significantly improving search performance on large datasets.
