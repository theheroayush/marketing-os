## 2026-09-18 - Pre-compute Search String Optimization
**Learning:** In vanilla JS filtering loops, repeatedly calling `.toLowerCase()` on multiple properties for each object creates significant garbage collection overhead and slows down search operations, especially on low-end devices. Pre-computing a concatenated search string during initialization removes this bottleneck from the hot path.
**Action:** When filtering lists using multiple object properties, pre-compute a concatenated, lowercased string property separated by a delimiter like `|` during the app initialization phase.
