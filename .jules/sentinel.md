## 2025-05-14 - Fix Unescaped Interpolation Vulnerability
**Vulnerability:** Found unescaped user inputs (`searchQ` and `projectName`) dynamically interpolated directly into template strings assigned to `innerHTML` in `app.js`.
**Learning:** Even internal or local-storage sourced UI state variables like a project name must be consistently sanitized when building raw HTML strings using template literals to avoid XSS vectors.
**Prevention:** Always wrap dynamically interpolated string values in sanitization functions (like `app.escapeHtml()`) before concatenating them into HTML strings.
