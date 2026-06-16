## 2024-05-18 - RegExp Dictionary Replacements
**Learning:** Chained `.replace()` calls in JavaScript create intermediate string allocations and traverse the string multiple times, which can become a bottleneck for frequently called utility functions like `escapeHtml`.
**Action:** Replace chained `.replace()` calls with a single-pass `RegExp` (e.g., `/[&<>"']/g`) and a dictionary lookup function for mapping matched characters, significantly improving performance and reducing memory overhead.
