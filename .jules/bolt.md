## 2024-06-25 - Early Returns in Search Filters
**Learning:** Array `.filter()` methods in UI loops can cause performance issues if computationally expensive string allocations (like `.toLowerCase()`) are evaluated before cheaper boolean/category checks, even when logically short-circuited.
**Action:** Always structure filter callbacks with early returns for exact boolean or category matches before executing string allocations or `.includes()` operations.
