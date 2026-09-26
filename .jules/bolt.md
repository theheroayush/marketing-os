## 2026-09-26 - Pre-computed Search Strings
**Learning:** In vanilla JS list filtering (like `window.SKILLS`), running dynamic string allocations and `.toLowerCase()` on multiple properties inside the filter loop for every keystroke creates unnecessary memory pressure and CPU cycles.
**Action:** Pre-compute a concatenated, lowercased search string property (e.g., `_searchString`) during the initialization phase using a unique delimiter (e.g., `|`) to prevent cross-field matching and avoid 'undefined' coercions.
