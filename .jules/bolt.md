## 2026-06-07 - Early Returns in Array Iteration
**Learning:** Filtering arrays by evaluating all conditions (including expensive string operations) instead of using early returns can cause significant performance overhead.
**Action:** Always use early returns for inexpensive comparisons (like exact matches) before executing computationally expensive operations (like `.toLowerCase().includes()`) in filter callbacks.
