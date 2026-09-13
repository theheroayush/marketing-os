## 2026-09-13 - Pre-compute Search String
**Learning:** Calling .toLowerCase() on multiple string properties inside a loop during filtering can be a bottleneck.
**Action:** Pre-compute and concatenate lowercased search strings with a delimiter during initialization.
