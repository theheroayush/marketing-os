## 2026-08-30 - Pre-computing Search Strings for Frontend Filtering
**Learning:** In vanilla JS applications with dynamic lists (like `window.SKILLS`), running methods like `.toLowerCase()` and string concatenation on multiple object properties inside a `.filter()` loop on every keystroke creates unnecessary CPU overhead and memory allocations.
**Action:** Pre-compute a combined, lowercased search string property (e.g., `_searchString`) during application initialization to optimize the filter loop.
