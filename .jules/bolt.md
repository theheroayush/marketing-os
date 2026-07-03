## 2026-07-03 - Optimize Array Iteration

**Learning:** When using `.filter()` on arrays in high-frequency paths (like client-side debounced searches), it's critical to hoist invariant operations out of the iteration callback. Additionally, using early returns for condition checks prevents computationally expensive string allocations and checks like `.toLowerCase()` and `.includes()` from running unnecessarily, significantly lowering the overhead per item.
**Action:** Always verify if constant expressions can be extracted prior to the loop. Structure the callback's checks so that inexpensive boolean/strict-equality conditions are evaluated before complex string manipulations.
