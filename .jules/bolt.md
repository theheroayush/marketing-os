
## 2026-09-16 - Pre-computing complex dynamic strings for search loops
**Learning:** In vanilla JavaScript list filtering logic (such as searching a list of objects where properties need to be combined and lowercased), running `.toLowerCase()` and string concatenation operations inside the `.filter()` loop causes redundant allocations and repetitive overhead for every keystroke.
**Action:** When filtering objects, pre-compute a concatenated, lowercased `_searchString` property during the array's initialization phase. Use a unique delimiter (like `|`) between values to prevent unintended cross-boundary matches, and handle potential undefined values gracefully (e.g. `s.name || ""`). This turns repetitive inside-the-loop string manipulation into a fast O(N) lookup.
