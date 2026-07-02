## 2025-07-02 - Short-circuiting Array Operations
**Learning:** Eager evaluation in `filter` callbacks can cause significant unnecessary string allocations and `.includes` checks in Javascript arrays, especially when category filters could dismiss elements upfront.
**Action:** Always check inexpensive categorical conditionals and `return false` early before evaluating computationally expensive string matching on object properties.
