## 2024-05-20 - Early Returns in Filter Iterations
**Learning:** In arrays like window.SKILLS, computationally expensive string operations like .toLowerCase() and .includes() are executed on every item unless inexpensive property checks (like exact match on category) return early.
**Action:** Always structure filter iterations to use early returns for inexpensive boolean or category checks before executing expensive string allocations.
