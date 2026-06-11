## 2026-06-11 - Optimized Category Filtering
**Learning:** The array filtering logic in `renderSkillsHub()` was applying computationally expensive `.toLowerCase()` and `.includes()` checks to strings (name, tagline, desc) even when the item was already guaranteed to be excluded by the category filter.
**Action:** Use early returns in `.filter()` to bypass expensive operations for items that fail cheap boolean checks like exact category matches.
