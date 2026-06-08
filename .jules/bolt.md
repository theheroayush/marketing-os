## 2026-06-08 - Optimize search filter with early returns
**Learning:** Reorganizing array `.filter()` callbacks to execute simple/cheap checks (like category matching or empty string checks) before executing computationally expensive string operations (like `.toLowerCase().includes()`) can result in ~3x speedups for large lists.
**Action:** Always prioritize early returns for cheap conditional checks in array iterations before executing heavy string manipulation or allocation.
