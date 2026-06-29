## 2026-06-29 - Short-circuit array filter logic
**Learning:** Evaluated string allocations and includes() operations within a `.filter()` callback for every array item regardless of category check.
**Action:** Always short-circuit the filter logic with an early return if the items do not belong to the selected category to skip unnecessary string allocations.
