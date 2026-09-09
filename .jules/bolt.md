## 2026-09-09 - Pre-compute Search String
**Learning:** Running string operations like `.toLowerCase()` repeatedly inside a filter loop on multiple object properties is slow. Pre-computing a concatenated search string during initialization significantly speeds up filtering.
**Action:** Pre-compute and cache a search string on items during initialization to avoid repetitive allocations inside loops.
