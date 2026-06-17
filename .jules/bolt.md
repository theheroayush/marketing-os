## 2024-06-17 - Optimize Array Filtering
**Learning:** The frontend filters a large `window.SKILLS` array (1670 items) synchronously. Evaluating all conditions, including expensive string operations like `.toLowerCase().includes()`, on every item regardless of category match causes unnecessary blocking.
**Action:** Always structure filter callbacks to use early returns for inexpensive checks (like exact string matches) before executing computationally expensive operations.
