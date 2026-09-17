## 2026-09-17 - Pre-compute Search String
**Learning:** For frontend filtering of large arrays using multiple string fields, repeated .toLowerCase() calls during the filter loop can cause measurable input latency. Pre-computing a concatenated lowercase string with a delimiter during app initialization significantly boosts performance.
**Action:** When implementing client-side search across multiple properties, pre-calculate a single _searchString once rather than allocating new lowercase strings for every property on every render or keystroke.
