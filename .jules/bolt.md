## 2026-08-27 - Pre-compute Search Strings for Faster List Filtering
**Learning:** In vanilla JS applications like this, dynamically creating and manipulating strings (e.g. `toLowerCase()`) inside filter loops over large arrays creates unnecessary overhead and garbage collection pressure, leading to UI jank during rapid typing (search filtering).
**Action:** Always pre-compute a lowercase, concatenated search string property on each object during data initialization, reducing filter overhead from O(N * props) to O(N) simple `.includes()` string lookups.
