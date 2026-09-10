## 2026-09-10 - Optimize Frontend List Filtering
**Learning:** Running dynamic string allocations and methods like `.toLowerCase()` on multiple object properties inside the filter loop is an anti-pattern that slows down search.
**Action:** Pre-compute a concatenated, lowercased search string property during the initialization phase instead.
