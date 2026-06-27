## 2024-06-27 - Filter loop early return optimization
**Learning:** Found a loop calculation in array filter `renderSkillsHub()` which executed all boolean checks sequentially and allocated string `.toLowerCase()` operations even when inexpensive categorical logic (`s.cat !== catFilter`) was sufficient to filter out an element.
**Action:** When filtering arrays by multiple criteria in the frontend, I will evaluate less expensive conditions (like boolean or category equality checks) first and use early returns to short-circuit expensive operations like string lowercasing and matching.
