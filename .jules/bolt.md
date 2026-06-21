## 2024-05-24 - Early Returns in Array Iterators
**Learning:** In app.js `window.SKILLS.filter`, the filter callback evaluated computationally expensive string operations (`.toLowerCase().includes()`) for all elements before the return statement, even when they would be filtered out by an inexpensive category check.
**Action:** Always structure filter callbacks with early returns for inexpensive checks to skip expensive string allocations for discarded elements.
