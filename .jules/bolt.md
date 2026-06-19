## 2024-06-19 - Filter Loop Early Returns
**Learning:** Evaluating inexpensive boolean checks (like category matching) and returning early prevents unnecessary execution of expensive string allocations and search operations (`toLowerCase().includes()`) for items that wouldn't pass the filter anyway.
**Action:** Always structure array filter callbacks to use early returns for inexpensive checks before executing computationally expensive operations.
