## 2026-06-06 - Array filtering optimization
**Learning:** In string intensive arrays, filtering checks need to avoid redundant operations like .toLowerCase().
**Action:** Hoist early returns in array callbacks.
