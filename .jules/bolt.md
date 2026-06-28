## 2025-02-18 - Array Filtering String Allocations
**Learning:** String allocations (`toLowerCase()`) in hot loops like `.filter()` are a major bottleneck. Doing them before cheaper checks (like boolean category matching) wastes significant CPU cycles.
**Action:** Always hoist loop invariants and perform early returns for inexpensive checks (like exact boolean or category matches) before executing computationally expensive operations (like string allocations and `.includes()`).
