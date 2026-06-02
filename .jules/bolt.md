## 2024-05-18 - [Optimized array filter with early returns]
**Learning:** Using `&&` inline (e.g. `matchCat && matchQ`) inside `Array.prototype.filter()` executes the initial variable assignments regardless of conditions. This wastes computation on string allocations and `.toLowerCase().includes()` operations if the preceding categorical check fails.
**Action:** Structure array filters using early returns to ensure computationally expensive checks are only performed when necessary, particularly in UI event loops where `.filter()` runs continuously.
