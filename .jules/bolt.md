## 2025-02-13 - Frontend Search Optimization
**Learning:** Pre-computing concatenated search strings for local filtering is a major win for simple array lists. Repeating `.toLowerCase()` dynamically on multiple object properties inside the `.filter()` loop every keystroke blocks the main thread on large datasets.
**Action:** When filtering objects via vanilla JS/DOM, pre-allocate search strings as a single concatenated property using a unique delimiter (like `|`) on app load instead of building them repeatedly during user interaction.
