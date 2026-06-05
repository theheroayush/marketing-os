## 2024-06-05 - Optimize array filtering with early returns
**Learning:** In JavaScript, calculating expensive string operations (`toLowerCase()`, `includes()`) before or simultaneously with cheap boolean/string comparisons (like category matching) inside an array `.filter()` wastes CPU cycles, especially on large datasets.
**Action:** Structure `.filter()` callbacks to use early returns for inexpensive checks (like exact matches or `!query`) before executing computationally expensive operations to avoid unnecessary string allocations.
