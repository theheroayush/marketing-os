## 2026-09-11 - Pre-computing search strings for list filtering
**Learning:** In vanilla JS apps with complex array filtering (like searching multiple object properties on every keystroke), repeatedly calling `.toLowerCase()` and string methods inside the `.filter()` loop is a common performance bottleneck.
**Action:** When filtering lists by multiple fields, pre-compute a concatenated, lowercased `_searchString` (e.g., `s.name + "|" + s.desc`) during data initialization. Use delimiters like `|` to prevent accidental cross-field matches.
