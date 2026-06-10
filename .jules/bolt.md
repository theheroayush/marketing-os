## 2024-05-18 - Array iteration early returns
**Learning:** Hoisting loop invariants and using early returns for inexpensive checks (like exact category matches) before computationally expensive string operations like `.toLowerCase()` avoids unnecessary object allocations and speeds up array filtering significantly.
**Action:** Always structure filter callbacks to evaluate cheap boolean/equality checks before expensive string/object manipulations.
