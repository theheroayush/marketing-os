## 2024-05-24 - [Avoid premature string replacement optimization in V8]
**Learning:** Replacing chained `.replace()` calls with a single-pass regex and dictionary lookup is often assumed to be faster, but in modern V8 environments (Node.js), chained string replacements are highly optimized and frequently outperform map lookups.
**Action:** Always benchmark string manipulation optimizations in the target environment instead of assuming map lookups are faster.

## 2024-05-24 - [Early returns in Array filtering]
**Learning:** In `Array.prototype.filter()` callbacks involving computationally expensive operations (like multiple `.toLowerCase().includes()` checks), evaluating them for every item without short-circuiting causes significant overhead.
**Action:** Structure filter callbacks to use early returns for inexpensive comparisons (like exact category matches or boolean checks) *before* executing expensive string operations to avoid unnecessary allocations.
