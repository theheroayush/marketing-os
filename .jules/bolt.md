## 2024-05-17 - String Replacement Chain Overhead
**Learning:** Chained `.replace()` calls in JavaScript create intermediate string allocations and require multiple passes over the text, which is notably slower for common utility functions like `escapeHtml` that process dynamic content on every render.
**Action:** Replace sequential `.replace()` chains with a single-pass Regular Expression and a dictionary lookup for improved execution speed, especially in highly-used utility functions.
