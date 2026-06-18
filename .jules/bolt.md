## 2024-06-18 - Early Returns in Array Filters
**Learning:** When filtering large arrays (like SKILLS list) with multiple conditions, combining them with `&&` or `||` causes all parts to be evaluated (or partially evaluated based on short-circuiting) but computing the expressions themselves (like `.toLowerCase()`) can be expensive if not ordered correctly.
**Action:** Always structure filter callbacks using early returns. Test inexpensive exact-match checks (like category matching) before triggering expensive operations like string allocations (`toLowerCase`) and `.includes()`.
