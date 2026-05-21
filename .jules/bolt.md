
## 2024-05-21 - Optimize String Escaping
**Learning:** Chained `.replace()` calls for string escaping (like in `escapeHtml`) create unnecessary intermediate string allocations which slow down execution speed, especially when repeated thousands of times or with large strings.
**Action:** Use a dictionary-based single-pass Regular Expression (e.g. `replace(/[&<>"']/g, m => map[m])`) for character escaping to prevent intermediate allocations and improve performance.
