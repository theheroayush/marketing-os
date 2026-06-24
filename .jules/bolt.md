## 2026-06-24 - Array Iteration Performance
**Learning:** In highly trafficked array iterations (like frontend search/filter functions), performing string manipulations (like `.toLowerCase()`) and allocations on every item is a significant bottleneck.
**Action:** Always structure filter callbacks with early returns for inexpensive checks (like exact string comparisons or booleans) before executing computationally expensive operations.
